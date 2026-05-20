'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Generează textura pungii pe Canvas — copiată după designul real AllNuts
function useBagTexture(bagColor: string, labelColor: string, isGold: boolean) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 768
    const ctx = canvas.getContext('2d')!

    // Fond pungă (gradient)
    const grad = ctx.createLinearGradient(0, 0, 512, 768)
    grad.addColorStop(0, lighten(bagColor, 30))
    grad.addColorStop(0.5, bagColor)
    grad.addColorStop(1, darken(bagColor, 30))
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 768)

    // Dungi subtile (textura materialului)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 2
    for (let i = 0; i < 512; i += 18) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 768)
      ctx.stroke()
    }

    // Oval etichetă (roșu cu contur alb — ca pe punga reală)
    const cx = 256, cy = 380, rx = 190, ry = 130
    ctx.save()
    ctx.translate(cx, cy)

    // Umbră ovalului
    ctx.shadowColor = 'rgba(0,0,0,0.4)'
    ctx.shadowBlur = 20

    // Oval background roșu
    ctx.beginPath()
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
    if (isGold) {
      const goldGrad = ctx.createRadialGradient(-30, -30, 10, 0, 0, rx)
      goldGrad.addColorStop(0, '#f5d060')
      goldGrad.addColorStop(0.5, '#d4a017')
      goldGrad.addColorStop(1, '#a07010')
      ctx.fillStyle = goldGrad
    } else {
      ctx.fillStyle = '#EC1C24'
    }
    ctx.fill()

    // Contur alb oval
    ctx.shadowBlur = 0
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 8
    ctx.stroke()

    // Al doilea contur interior
    ctx.beginPath()
    ctx.ellipse(0, 0, rx - 14, ry - 14, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 3
    ctx.stroke()

    // Text "ALL NUTS" în oval
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.font = 'bold 64px Arial Black, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('ALL NUTS', 0, -18)

    ctx.font = '500 22px Arial, sans-serif'
    ctx.letterSpacing = '6px'
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.fillText('SEMINTE', 0, 28)

    ctx.font = '400 16px Arial, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillStyle = 'rgba(255,255,255,0.65)'
    ctx.fillText('DE FLOAREA SOARELUI', 0, 56)

    ctx.restore()

    // Greutate (jos)
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = 'bold 28px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('130g', 256, 620)

    // Linie decorativă sus
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(60, 120)
    ctx.lineTo(452, 120)
    ctx.stroke()

    // Sigiliu sus (guler)
    const guleGrad = ctx.createLinearGradient(0, 60, 0, 110)
    guleGrad.addColorStop(0, darken(bagColor, 20))
    guleGrad.addColorStop(1, bagColor)
    ctx.fillStyle = guleGrad
    ctx.fillRect(100, 60, 312, 50)

    // Clip metalic
    const clipGrad = ctx.createLinearGradient(0, 0, 512, 0)
    clipGrad.addColorStop(0, '#888')
    clipGrad.addColorStop(0.5, '#eee')
    clipGrad.addColorStop(1, '#888')
    ctx.fillStyle = clipGrad
    ctx.fillRect(130, 68, 252, 14)

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [bagColor, labelColor, isGold])
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + amount)
  const g = Math.min(255, ((num >> 8) & 0xff) + amount)
  const b = Math.min(255, (num & 0xff) + amount)
  return `rgb(${r},${g},${b})`
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - amount)
  const g = Math.max(0, ((num >> 8) & 0xff) - amount)
  const b = Math.max(0, (num & 0xff) - amount)
  return `rgb(${r},${g},${b})`
}

interface SeedBagProps {
  position?: [number, number, number]
  index?: number
  bagColor?: string    // culoarea pungii
  isGold?: boolean     // label auriu sau roșu
}

export function SeedBag3D({ position = [0, 0, 0], index = 0, bagColor = '#8B3A8B', isGold = false }: SeedBagProps) {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useBagTexture(bagColor, '#EC1C24', isGold)

  useEffect(() => {
    if (!groupRef.current) return
    const offset = index * (Math.PI * 2 / 5)

    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: '+=350%',
      scrub: 2.5,
      onUpdate: (self) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = offset + self.progress * Math.PI * 8
        groupRef.current.rotation.x = Math.sin(self.progress * Math.PI * 3) * 0.35
        // Se adună spre centru la progres > 0.7
        if (self.progress > 0.7) {
          const t = (self.progress - 0.7) / 0.3
          groupRef.current.position.x = THREE.MathUtils.lerp(position[0], position[0] * (1 - t * 0.5), t)
        }
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [index, position])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.7 + index * 1.3) * 0.12
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Corp pungă */}
      <RoundedBox args={[1.1, 1.65, 0.38]} radius={0.07} smoothness={6} castShadow>
        <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Guler sus */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[0.85, 0.18, 0.32]} />
        <meshStandardMaterial color={bagColor} roughness={0.4} />
      </mesh>

      {/* Clip metalic */}
      <mesh position={[0, 0.96, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.3]} />
        <meshStandardMaterial color="#cccccc" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Reflexie laterală */}
      <mesh position={[0.42, 0, 0]}>
        <planeGeometry args={[0.05, 1.5]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} roughness={0} />
      </mesh>
    </group>
  )
}
