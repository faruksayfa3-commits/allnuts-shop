'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// GEOMETRIE PUNGĂ — formă reală de snack bag
// Cross-section: elipsă turtită (lată X, subțire Z)
// Sigiliu sus/jos: se aplatizează brusc
// Cusături laterale: unghi ~PI/2 și ~3PI/2 extra-turtite
// ─────────────────────────────────────────────────────────────────────────────
function createBagGeometry(): THREE.BufferGeometry {
  const SEGS_U = 48   // segmente în jurul circumferinței
  const SEGS_V = 60   // segmente pe înălțime
  const BAG_H  = 1.9  // înălțime totală
  const HALF_W = 0.55 // jumătate lățime

  const positions: number[] = []
  const uvs:       number[] = []
  const indices:   number[] = []

  for (let j = 0; j <= SEGS_V; j++) {
    const t = j / SEGS_V         // 0 = jos, 1 = sus
    const y = (t - 0.5) * BAG_H

    // ── profil înălțime → grosime (Z) și lățime (X) ──────────────────────
    let depthScale: number
    let widthScale: number

    if (t < 0.045) {
      // sigiliu jos — se strânge de jos în sus
      const s = t / 0.045
      depthScale = THREE.MathUtils.lerp(0.008, 0.30, s * s)
      widthScale = THREE.MathUtils.lerp(0.55,  1.00, s)
    } else if (t < 0.09) {
      // tranziție corp jos
      const s = (t - 0.045) / 0.045
      depthScale = THREE.MathUtils.lerp(0.30, 0.34, s)
      widthScale = 1.0
    } else if (t < 0.88) {
      // corp principal — ușor umflat la mijloc
      const s   = (t - 0.09) / 0.79
      const puf = Math.sin(s * Math.PI) * 0.04
      depthScale = 0.34 + puf
      widthScale = 1.0
    } else if (t < 0.935) {
      // gât — se strânge ușor
      const s = (t - 0.88) / 0.055
      depthScale = THREE.MathUtils.lerp(0.34, 0.14, s)
      widthScale = THREE.MathUtils.lerp(1.00, 0.84, s)
    } else {
      // sigiliu sus — se aplatizează
      const s = (t - 0.935) / 0.065
      depthScale = THREE.MathUtils.lerp(0.14, 0.006, s * s)
      widthScale = THREE.MathUtils.lerp(0.84, 0.72,  s)
    }

    for (let i = 0; i <= SEGS_U; i++) {
      // Pornim de la PI → cusătura (seam) e pe spate, fața e la mijlocul texturii
      const a = (i / SEGS_U) * Math.PI * 2 + Math.PI

      // ── cusăturile laterale: unghiuri ~PI/2 și ~3PI/2 extra-turtite ──
      // sin²(a) este max la PI/2 și 3PI/2 — exact unde sunt cusăturile
      const seamFlat = 1.0 - 0.82 * Math.pow(Math.abs(Math.sin(a)), 3.5)

      const x = HALF_W * widthScale * Math.cos(a)
      const z = HALF_W * depthScale * Math.sin(a) * seamFlat

      positions.push(x, y, z)
      // UV: U=0 la spate, U=0.5 la față (label centrat)
      uvs.push(i / SEGS_U, 1 - t)
    }
  }

  // ── indecși ──────────────────────────────────────────────────────────────
  for (let j = 0; j < SEGS_V; j++) {
    for (let i = 0; i < SEGS_U; i++) {
      const a = j * (SEGS_U + 1) + i
      const b = a + 1
      const c = a + (SEGS_U + 1)
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTURĂ — față și spate pe același UV wrapp
// Fața (U≈0.25–0.75) are oval etichetă ALL NUTS
// Spatele (U≈0–0.25 și U≈0.75–1) e colorat simplu
// ─────────────────────────────────────────────────────────────────────────────
function buildBagTexture(bagHex: string, isGold: boolean): THREE.CanvasTexture {
  const W = 1024, H = 1024
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!

  // ── Fond: întreg UV (față + spate + laterale) ───────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0,   hex2rgb(bagHex, +50))
  bg.addColorStop(0.3, hex2rgb(bagHex, +20))
  bg.addColorStop(0.7, bagHex)
  bg.addColorStop(1,   hex2rgb(bagHex, -40))
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Dunguleţe verticale (textura materialului) — pe tot
  ctx.globalAlpha = 0.06
  for (let x = 0; x < W; x += 30) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x, 0, 14, H)
  }
  ctx.globalAlpha = 1

  // ── Sigiliu sus (banda din top 6.5%) ────────────────────────────────────
  // Face = U 0.25-0.75 → px 256-768
  const sealGrad = ctx.createLinearGradient(0, 0, 0, H * 0.07)
  sealGrad.addColorStop(0, hex2rgb(bagHex, -50))
  sealGrad.addColorStop(1, hex2rgb(bagHex, -20))
  ctx.fillStyle = sealGrad
  ctx.fillRect(0, 0, W, H * 0.065)

  // Clip metalic pe față (U 0.3-0.7)
  const metal = ctx.createLinearGradient(W * 0.3, 0, W * 0.7, 0)
  metal.addColorStop(0, '#666')
  metal.addColorStop(0.3, '#e0e0e0')
  metal.addColorStop(0.7, '#e0e0e0')
  metal.addColorStop(1, '#666')
  ctx.fillStyle = metal
  ctx.fillRect(W * 0.3, H * 0.033, W * 0.4, H * 0.018)

  // ── Linii cusătură laterală (la U≈0.25 și U≈0.75) ───────────────────────
  ctx.strokeStyle = hex2rgb(bagHex, -60)
  ctx.lineWidth = 6
  // stânga cusătură
  ctx.beginPath(); ctx.moveTo(W * 0.25, H * 0.04); ctx.lineTo(W * 0.25, H * 0.97); ctx.stroke()
  // dreapta cusătură
  ctx.beginPath(); ctx.moveTo(W * 0.75, H * 0.04); ctx.lineTo(W * 0.75, H * 0.97); ctx.stroke()
  // linii interioare
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(W * 0.258, H * 0.04); ctx.lineTo(W * 0.258, H * 0.97); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(W * 0.742, H * 0.04); ctx.lineTo(W * 0.742, H * 0.97); ctx.stroke()

  // ── OVAL ETICHETĂ — centrat pe față (U=0.5 → cx=W/2) ────────────────────
  const cx = W * 0.5
  const cy = H * 0.46
  const rx  = W * 0.19
  const ry  = H * 0.155

  ctx.save()
  ctx.translate(cx, cy)

  // umbra
  ctx.shadowColor = 'rgba(0,0,0,0.65)'
  ctx.shadowBlur = 28

  // fond oval
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)

  if (isGold) {
    const g = ctx.createRadialGradient(-rx * 0.4, -ry * 0.4, 4, 0, 0, rx)
    g.addColorStop(0, '#f8e060')
    g.addColorStop(0.55, '#c8920a')
    g.addColorStop(1, '#7a5500')
    ctx.fillStyle = g
  } else {
    const g = ctx.createRadialGradient(-rx * 0.3, -ry * 0.4, 4, 0, 0, rx)
    g.addColorStop(0, '#ff4040')
    g.addColorStop(0.55, '#EC1C24')
    g.addColorStop(1, '#8a0010')
    ctx.fillStyle = g
  }
  ctx.fill()
  ctx.shadowBlur = 0

  // contur alb gros
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 10
  ctx.stroke()
  // contur alb interior subțire
  ctx.beginPath()
  ctx.ellipse(0, 0, rx - 17, ry - 17, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.30)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // ── Texte în oval ──
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 6
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // "ALL NUTS"
  ctx.font = `bold ${rx * 0.68}px "Arial Black", Impact, sans-serif`
  ctx.fillText('ALL NUTS', 0, -ry * 0.2)

  // linie separatoare
  ctx.shadowBlur = 0
  ctx.strokeStyle = 'rgba(255,255,255,0.45)'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(-rx * 0.7, ry * 0.1); ctx.lineTo(rx * 0.7, ry * 0.1); ctx.stroke()

  // "SEMINTE"
  ctx.font = `600 ${rx * 0.22}px Arial, sans-serif`
  ctx.fillStyle = 'rgba(255,255,255,0.88)'
  ctx.letterSpacing = '3px'
  ctx.fillText('SEMINTE', 0, ry * 0.36)

  ctx.font = `400 ${rx * 0.14}px Arial, sans-serif`
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.fillText('DE FLOAREA SOARELUI', 0, ry * 0.62)

  ctx.restore()

  // ── Fereastră transparentă jos față ─────────────────────────────────────
  ctx.save()
  const wx = W * 0.5, wy = H * 0.74, ww = W * 0.26, wh = H * 0.12
  ctx.globalAlpha = 0.13
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(wx - ww / 2, wy - wh / 2, ww, wh, 8)
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()

  // ── Greutate ─────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = `bold ${W * 0.026}px Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText('130g  ·  e', W * 0.5, H * 0.89)

  // ── Reflexie / highlight față ────────────────────────────────────────────
  const refl = ctx.createLinearGradient(W * 0.28, 0, W * 0.38, 0)
  refl.addColorStop(0, 'rgba(255,255,255,0)')
  refl.addColorStop(0.5, 'rgba(255,255,255,0.07)')
  refl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = refl
  ctx.fillRect(W * 0.25, H * 0.065, W * 0.14, H * 0.90)

  return new THREE.CanvasTexture(c)
}

// ─────────────────────────────────────────────────────────────────────────────
// Glow difuz în culoarea pungii (sprite Additive)
// ─────────────────────────────────────────────────────────────────────────────
function GlowSprite({ color }: { color: string }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0,   color + 'bb')
    g.addColorStop(0.4, color + '33')
    g.addColorStop(1,   color + '00')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(c)
  }, [color])

  return (
    <mesh position={[0, 0, -0.9]}>
      <planeGeometry args={[4.5, 5]} />
      <meshBasicMaterial
        map={tex} transparent depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitar culori
// ─────────────────────────────────────────────────────────────────────────────
function hex2rgb(hex: string, shift = 0): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (n >> 16) + shift))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + shift))
  const b = Math.max(0, Math.min(255, (n & 0xff) + shift))
  return `rgb(${r},${g},${b})`
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTA PUNGĂ 3D
// ─────────────────────────────────────────────────────────────────────────────
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

  const geo     = useMemo(() => createBagGeometry(), [])
  const texture = useMemo(() => buildBagTexture(bagColor, isGold), [bagColor, isGold])

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.22,
    metalness: 0.12,
    side: THREE.DoubleSide,
    envMapIntensity: 0.8,
  }), [texture])

  useEffect(() => {
    if (!groupRef.current) return
    const offset = index * ((Math.PI * 2) / 5)
    const px = position[0], pz = position[2]

    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: '+=450%',
      scrub: 2.8,
      onUpdate: (self) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = offset + self.progress * Math.PI * 12
        groupRef.current.rotation.x = Math.sin(self.progress * Math.PI * 3 + offset) * 0.45
        // derive ușoară
        groupRef.current.position.x = px + Math.sin(self.progress * Math.PI * 2 + offset) * 0.6
        groupRef.current.position.z = pz + Math.cos(self.progress * Math.PI * 2 + offset) * 0.4
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [index, position])

  useFrame((s) => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      position[1] + Math.sin(s.clock.elapsedTime * 0.65 + index * 1.5) * 0.14
  })

  return (
    <group ref={groupRef} position={position}>
      <GlowSprite color={bagColor} />
      <mesh geometry={geo} material={mat} castShadow receiveShadow />
    </group>
  )
}
