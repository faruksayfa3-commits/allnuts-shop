'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Generează textura pungii AllNuts pe Canvas ──────────────────────────────
// Replica fidelă a pungii reale: corp colorat + oval etichetă roșie/gold cu
// "ALL NUTS" în alb, clip metalic sus, fereastră transparentă jos.
function buildBagTexture(bagHex: string, isGold: boolean): THREE.CanvasTexture {
  const W = 512, H = 800
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!

  // ── 1. Corp pungă (gradient vertical) ──
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0,   shiftColor(bagHex, +40))
  bg.addColorStop(0.3, shiftColor(bagHex, +15))
  bg.addColorStop(0.7, bagHex)
  bg.addColorStop(1,   shiftColor(bagHex, -40))
  ctx.fillStyle = bg
  ctx.roundRect(0, 0, W, H, 0)
  ctx.fill()

  // ── 2. Dungi verticale subtile (textura materialului) ──
  for (let x = 0; x < W; x += 22) {
    const s = ctx.createLinearGradient(x, 0, x + 11, 0)
    s.addColorStop(0,   'rgba(255,255,255,0)')
    s.addColorStop(0.5, 'rgba(255,255,255,0.05)')
    s.addColorStop(1,   'rgba(255,255,255,0)')
    ctx.fillStyle = s
    ctx.fillRect(x, 80, 11, H - 80)
  }

  // ── 3. Sigiliu / guler sus ──
  const guleGrad = ctx.createLinearGradient(0, 60, 0, 130)
  guleGrad.addColorStop(0, shiftColor(bagHex, -30))
  guleGrad.addColorStop(1, bagHex)
  ctx.fillStyle = guleGrad
  ctx.fillRect(80, 65, W - 160, 65)

  // clip metalic
  const metalGrad = ctx.createLinearGradient(80, 0, W - 80, 0)
  metalGrad.addColorStop(0,   '#555')
  metalGrad.addColorStop(0.3, '#ddd')
  metalGrad.addColorStop(0.7, '#eee')
  metalGrad.addColorStop(1,   '#555')
  ctx.fillStyle = metalGrad
  ctx.fillRect(110, 74, W - 220, 16)

  // ── 4. OVAL ETICHETĂ (roșu sau gold) ──
  const cx = W / 2, cy = 400, rx = 195, ry = 140
  ctx.save()
  ctx.translate(cx, cy)

  // umbra ovalului
  ctx.shadowColor = 'rgba(0,0,0,0.6)'
  ctx.shadowBlur = 25

  // fond oval
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  if (isGold) {
    const gGrad = ctx.createRadialGradient(-40, -40, 10, 0, 0, rx)
    gGrad.addColorStop(0, '#f7dc60')
    gGrad.addColorStop(0.55, '#d4a017')
    gGrad.addColorStop(1, '#8b6400')
    ctx.fillStyle = gGrad
  } else {
    const rGrad = ctx.createRadialGradient(-20, -20, 10, 0, 0, rx)
    rGrad.addColorStop(0, '#ff3333')
    rGrad.addColorStop(0.6, '#EC1C24')
    rGrad.addColorStop(1, '#8b0000')
    ctx.fillStyle = rGrad
  }
  ctx.fill()

  ctx.shadowBlur = 0

  // contur alb exterior
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 9
  ctx.stroke()

  // contur interior subtil
  ctx.beginPath()
  ctx.ellipse(0, 0, rx - 16, ry - 16, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // ── Text în oval ──
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 8

  // "ALL NUTS" — bold mare
  ctx.font = 'bold 68px "Arial Black", Impact, sans-serif'
  ctx.fillText('ALL NUTS', 0, -22)

  // linie decorativă
  ctx.shadowBlur = 0
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(-130, 8); ctx.lineTo(130, 8)
  ctx.stroke()

  // "SEMINTE" subtitlu
  ctx.font = '600 20px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.letterSpacing = '4px'
  ctx.fillText('SEMINTE', 0, 30)

  ctx.font = '400 13px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillText('DE FLOAREA SOARELUI', 0, 56)

  ctx.restore()

  // ── 5. Fereastră transparentă (jos) — simulare ──
  ctx.save()
  ctx.globalAlpha = 0.12
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(W / 2 - 100, 590, 200, 120, 8)
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()

  // ── 6. Greutate ──
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('130g', W / 2, 660)

  // ── 7. Logo text jos ──
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  ctx.font = '11px Arial, sans-serif'
  ctx.fillText('allnuts.ro', W / 2, 750)

  return new THREE.CanvasTexture(c)
}

function shiftColor(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (n >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

// ─── Glow plane în spatele pungii — culoarea dominantă ───────────────────────
function BagGlow({ color }: { color: string }) {
  const col = useMemo(() => new THREE.Color(color), [color])
  return (
    <mesh position={[0, 0, -0.6]}>
      <planeGeometry args={[3.5, 4.5]} />
      <meshBasicMaterial color={col} transparent opacity={0.06} />
    </mesh>
  )
}

// Sprite glow circular difuz
function GlowSprite({ color }: { color: string }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 256
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, color + 'cc')
    g.addColorStop(0.4, color + '44')
    g.addColorStop(1, color + '00')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(c)
  }, [color])

  return (
    <mesh position={[0, 0, -0.8]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ─── Componenta principală SeedBag3D ─────────────────────────────────────────
interface SeedBagProps {
  position?: [number, number, number]
  index?: number
  bagColor?: string
  isGold?: boolean
}

export function SeedBag3D({
  position = [0, 0, 0],
  index = 0,
  bagColor = '#7B3B8C',
  isGold = false,
}: SeedBagProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Textură generată o singură dată per pungă
  const texture = useMemo(() => buildBagTexture(bagColor, isGold), [bagColor, isGold])

  // Textură spate (inversă, mai întunecată)
  const backTexture = useMemo(() => {
    const tex = buildBagTexture(shiftColor(bagColor, -30), false)
    return tex
  }, [bagColor])

  useEffect(() => {
    if (!groupRef.current) return
    const initialPos = { ...{ x: position[0], y: position[1], z: position[2] } }
    const offset = index * ((Math.PI * 2) / 5)

    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: '+=400%',
      scrub: 2.5,
      onUpdate: (self) => {
        if (!groupRef.current) return
        // Rotație
        groupRef.current.rotation.y = offset + self.progress * Math.PI * 10
        groupRef.current.rotation.x = Math.sin(self.progress * Math.PI * 4) * 0.4
        // Derive ușoară în spațiu
        groupRef.current.position.x = initialPos.x + Math.sin(self.progress * Math.PI * 2 + offset) * 0.5
        groupRef.current.position.z = initialPos.z + Math.cos(self.progress * Math.PI * 2 + offset) * 0.3
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [index, position])

  useFrame((state) => {
    if (!groupRef.current) return
    // Flotare sinusoidală independentă
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.65 + index * 1.5) * 0.15
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Glow difuz în culoarea pungii */}
      <GlowSprite color={bagColor} />
      <BagGlow color={bagColor} />

      {/* Corp pungă față — textură AllNuts */}
      <RoundedBox args={[1.15, 1.75, 0.05]} radius={0.06} smoothness={6} castShadow position={[0, 0, 0.18]}>
        <meshStandardMaterial map={texture} roughness={0.25} metalness={0.08} side={THREE.FrontSide} />
      </RoundedBox>

      {/* Corp pungă spate */}
      <RoundedBox args={[1.15, 1.75, 0.05]} radius={0.06} smoothness={6} castShadow position={[0, 0, -0.18]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial map={backTexture} roughness={0.3} metalness={0.05} side={THREE.FrontSide} />
      </RoundedBox>

      {/* Laterale pungii (volum 3D) */}
      <mesh castShadow>
        <boxGeometry args={[1.15, 1.75, 0.36]} />
        <meshStandardMaterial color={bagColor} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Guler / sigiliu sus */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.9, 0.22, 0.3]} />
        <meshStandardMaterial color={shiftColor(bagColor, -30)} roughness={0.4} />
      </mesh>

      {/* Clip metalic */}
      <mesh position={[0, 0.99, 0]}>
        <boxGeometry args={[0.65, 0.07, 0.28]} />
        <meshStandardMaterial color="#cccccc" roughness={0.08} metalness={0.95} />
      </mesh>

      {/* Highlight lateral (reflexie) */}
      <mesh position={[0.46, 0.1, 0]}>
        <planeGeometry args={[0.04, 1.4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
