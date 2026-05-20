'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Textură sămânță de floarea soarelui (dungi negre/albe pe fond cenușiu)
function useSeedTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Fond gri-deschis (coaja semintei)
    const bg = ctx.createLinearGradient(0, 0, 128, 0)
    bg.addColorStop(0, '#d0ccc0')
    bg.addColorStop(0.5, '#e8e4d8')
    bg.addColorStop(1, '#c0bca8')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 128, 256)

    // Dungi negre caracteristice semintei de floarea soarelui
    const stripes = [
      { x: 10, w: 12 }, { x: 30, w: 8 }, { x: 46, w: 14 },
      { x: 68, w: 10 }, { x: 86, w: 8 }, { x: 102, w: 14 },
    ]
    stripes.forEach(({ x, w }) => {
      const sg = ctx.createLinearGradient(x, 0, x + w, 0)
      sg.addColorStop(0, 'rgba(40,35,30,0.1)')
      sg.addColorStop(0.3, 'rgba(30,25,20,0.85)')
      sg.addColorStop(0.7, 'rgba(30,25,20,0.85)')
      sg.addColorStop(1, 'rgba(40,35,30,0.1)')
      ctx.fillStyle = sg

      // Dunga se îngustează la capete (forma ovală a semintei)
      ctx.beginPath()
      ctx.moveTo(x + w * 0.3, 4)
      ctx.lineTo(x + w * 0.7, 4)
      ctx.lineTo(x + w, 128)
      ctx.lineTo(x, 128)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(x, 128)
      ctx.lineTo(x + w, 128)
      ctx.lineTo(x + w * 0.7, 252)
      ctx.lineTo(x + w * 0.3, 252)
      ctx.closePath()
      ctx.fill()
    })

    // Margini mai închise (adâncime)
    const edge = ctx.createLinearGradient(0, 0, 128, 0)
    edge.addColorStop(0, 'rgba(0,0,0,0.35)')
    edge.addColorStop(0.1, 'rgba(0,0,0,0)')
    edge.addColorStop(0.9, 'rgba(0,0,0,0)')
    edge.addColorStop(1, 'rgba(0,0,0,0.35)')
    ctx.fillStyle = edge
    ctx.fillRect(0, 0, 128, 256)

    // Vârf ascuțit (negru)
    ctx.fillStyle = '#1a1510'
    ctx.beginPath()
    ctx.ellipse(64, 8, 20, 10, 0, 0, Math.PI * 2)
    ctx.fill()

    return new THREE.CanvasTexture(canvas)
  }, [])
}

// Geometrie personalizată — sămânță de floarea soarelui (elipsoid alungit)
function SeedGeometry() {
  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 12, 16)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      // Alungire pe Y + ușoară teșire pe Z
      pos.setXYZ(i, x * 0.13, y * 0.4, z * 0.1)
    }
    pos.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])
  return <primitive object={geom} />
}

const COUNT = 180

export function SunflowerSeeds() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const progressRef = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const texture = useSeedTexture()

  const seeds = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      ox: (Math.random() - 0.5) * 0.6,
      oy: (Math.random() - 0.5) * 1.0,
      oz: (Math.random() - 0.5) * 0.2,
      tx: (Math.random() - 0.5) * 10,
      ty: Math.random() * 6 + 0.5,
      tz: (Math.random() - 0.5) * 5,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.0,
      delay: Math.random() * 0.4,
      swirl: (Math.random() - 0.5) * 3,
    })), [])

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#product-reveal',
      start: 'top 70%',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => { progressRef.current = self.progress },
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const p = progressRef.current
    const t = state.clock.elapsedTime

    seeds.forEach((s, i) => {
      const d = Math.max(0, (p - s.delay) / (1 - s.delay))
      const e = d < 0.5 ? 4 * d ** 3 : 1 - (-2 * d + 2) ** 3 / 2

      dummy.position.set(
        THREE.MathUtils.lerp(s.ox, s.tx + Math.sin(t * 0.5 + i) * 0.3, e),
        THREE.MathUtils.lerp(s.oy, s.ty, e) + Math.sin(t * s.speed + i) * 0.06 * e,
        THREE.MathUtils.lerp(s.oz, s.tz, e)
      )
      dummy.rotation.set(
        s.rx + t * s.speed * 1.5,
        s.ry + t * s.speed,
        t * s.swirl * e
      )
      dummy.scale.setScalar(e > 0.02 ? 1 + e * 0.3 : 0)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  // Geometrie sămânță custom
  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 10, 14)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) * 0.13, pos.getY(i) * 0.42, pos.getZ(i) * 0.1)
    }
    pos.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[geom, undefined, COUNT]} castShadow>
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0} />
    </instancedMesh>
  )
}
