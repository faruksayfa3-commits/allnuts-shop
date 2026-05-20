'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Textura arahidei roșii
function useArahideTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!

    const g = ctx.createRadialGradient(50, 45, 5, 64, 64, 55)
    g.addColorStop(0, '#e83030')
    g.addColorStop(0.6, '#c01018')
    g.addColorStop(1, '#7a0808')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)

    // Vene/textura arahidei
    ctx.strokeStyle = 'rgba(180,0,0,0.5)'
    ctx.lineWidth = 1.5
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(64 + Math.cos(angle) * 15, 64 + Math.sin(angle) * 15)
      ctx.bezierCurveTo(
        64 + Math.cos(angle + 0.5) * 35, 64 + Math.sin(angle + 0.5) * 35,
        64 + Math.cos(angle - 0.5) * 35, 64 + Math.sin(angle - 0.5) * 35,
        64 + Math.cos(angle) * 50, 64 + Math.sin(angle) * 50
      )
      ctx.stroke()
    }

    // Highlight
    const hl = ctx.createRadialGradient(44, 38, 2, 44, 38, 20)
    hl.addColorStop(0, 'rgba(255,180,180,0.5)')
    hl.addColorStop(1, 'rgba(255,180,180,0)')
    ctx.fillStyle = hl
    ctx.fillRect(0, 0, 128, 128)

    return new THREE.CanvasTexture(canvas)
  }, [])
}

// Arahide care sar din pahar
const ARAHIDE_COUNT = 80

function ArahideParticles({ trigger }: { trigger: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const progressRef = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const texture = useArahideTexture()

  const arahide = useMemo(() =>
    Array.from({ length: ARAHIDE_COUNT }, (_, i) => ({
      ox: (Math.random() - 0.5) * 0.8,
      oy: -0.3 + Math.random() * 0.4,
      oz: (Math.random() - 0.5) * 0.8,
      tx: (Math.random() - 0.5) * 7,
      ty: Math.random() * 4 + 0.5,
      tz: (Math.random() - 0.5) * 4,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.2,
      delay: Math.random() * 0.35,
    })), [])

  useEffect(() => {
    ScrollTrigger.create({
      trigger,
      start: 'top 60%',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => { progressRef.current = self.progress },
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [trigger])

  useFrame((state) => {
    if (!meshRef.current) return
    const p = progressRef.current
    const t = state.clock.elapsedTime

    arahide.forEach((a, i) => {
      const d = Math.max(0, (p - a.delay) / (1 - a.delay))
      const e = d < 0.5 ? 4 * d ** 3 : 1 - (-2 * d + 2) ** 3 / 2

      dummy.position.set(
        THREE.MathUtils.lerp(a.ox, a.tx, e),
        THREE.MathUtils.lerp(a.oy, a.ty, e) + Math.sin(t * a.speed + i) * 0.05 * e,
        THREE.MathUtils.lerp(a.oz, a.tz, e)
      )
      dummy.rotation.set(a.rx + t * a.speed * 2, a.ry + t * a.speed, 0)
      dummy.scale.setScalar(e > 0.02 ? 1 : 0)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  const geom = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 10, 8)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) * 0.16, pos.getY(i) * 0.22, pos.getZ(i) * 0.16)
    }
    pos.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[geom, undefined, ARAHIDE_COUNT]} castShadow>
      <meshStandardMaterial map={texture} roughness={0.5} metalness={0.05} />
    </instancedMesh>
  )
}

// Pahar 3D transparent cu arahide înăuntru
function Pahar3D({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Corp pahar (cilindru transparent) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.55, 0.42, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          roughness={0}
          metalness={0}
          transmission={0.95}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fund pahar */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.04, 32]} />
        <meshPhysicalMaterial color="#e8e8e8" transparent opacity={0.4} roughness={0.1} />
      </mesh>

      {/* Contur pahar */}
      <mesh>
        <cylinderGeometry args={[0.57, 0.44, 1.22, 32, 1, true]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.25} roughness={0.1} wireframe={false} side={THREE.BackSide} />
      </mesh>

      {/* Arahide înăuntru (3 sfere roșii ca fill) */}
      {[
        [0.15, -0.3, 0.1],
        [-0.2, -0.15, -0.1],
        [0.0, -0.05, 0.2],
        [-0.1, -0.4, 0.15],
        [0.2, -0.45, -0.15],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color="#c01018" roughness={0.4} />
        </mesh>
      ))}

      {/* Reflexie pe pahar */}
      <mesh position={[0.3, 0.1, 0.3]}>
        <planeGeometry args={[0.06, 0.7]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export function PahareScene() {
  return (
    <group>
      <Pahar3D position={[-2.2, 0, -1]} />
      <Pahar3D position={[0, 0.3, 0]} />
      <Pahar3D position={[2.2, -0.2, -0.8]} />
      <ArahideParticles trigger="#pahare-section" />
    </group>
  )
}
