'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const COUNT = 150

export function SeedParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const progressRef = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const seeds = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      originX: (Math.random() - 0.5) * 0.3,
      originY: (Math.random() - 0.5) * 0.5,
      originZ: (Math.random() - 0.5) * 0.1,
      targetX: (Math.random() - 0.5) * 8,
      targetY: Math.random() * 5 + 0.5,
      targetZ: (Math.random() - 0.5) * 4,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      delay: Math.random() * 0.3,
    }))
  }, [])

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#product-reveal',
      start: 'top 60%',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const p = progressRef.current
    const t = state.clock.elapsedTime

    seeds.forEach((seed, i) => {
      const delayed = Math.max(0, (p - seed.delay) / (1 - seed.delay))
      const eased = delayed < 0.5 ? 4 * delayed ** 3 : 1 - (-2 * delayed + 2) ** 3 / 2

      dummy.position.set(
        THREE.MathUtils.lerp(seed.originX, seed.targetX, eased),
        THREE.MathUtils.lerp(seed.originY, seed.targetY, eased) +
          Math.sin(t * seed.speed + i) * 0.04 * eased,
        THREE.MathUtils.lerp(seed.originZ, seed.targetZ, eased)
      )
      dummy.rotation.set(
        seed.rotX + t * seed.speed,
        seed.rotY + t * seed.speed * 0.7,
        0
      )
      const scale = eased > 0.02 ? 1 : 0
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} castShadow>
      <capsuleGeometry args={[0.035, 0.07, 4, 8]} />
      <meshStandardMaterial color="#c8860a" roughness={0.5} metalness={0.15} />
    </instancedMesh>
  )
}
