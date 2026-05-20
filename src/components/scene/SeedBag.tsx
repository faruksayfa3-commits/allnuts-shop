'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SeedBagProps {
  position?: [number, number, number]
  index?: number
  color?: string
}

export function SeedBag({ position = [0, 0, 0], index = 0, color = '#c8860a' }: SeedBagProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return

    const offset = index * (Math.PI * 2 / 3)

    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: '+=300%',
      scrub: 2,
      onUpdate: (self) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = offset + self.progress * Math.PI * 6
        groupRef.current.rotation.x = Math.sin(self.progress * Math.PI * 2) * 0.4
        groupRef.current.position.y = position[1] + self.progress * (index % 2 === 0 ? 1.5 : -1.5)
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [index, position])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.9 + index * 2) * 0.001
  })

  const bagColor = [color, '#d4950f', '#b87a08'][index % 3]
  const labelColor = ['#1a0a00', '#2a1506', '#0f0500'][index % 3]

  return (
    <group ref={groupRef} position={position}>
      {/* Corp pungă */}
      <RoundedBox args={[1, 1.5, 0.35]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color={bagColor} roughness={0.25} metalness={0.05} />
      </RoundedBox>

      {/* Gura pungii (sus) */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.7, 0.15, 0.3]} />
        <meshStandardMaterial color={bagColor} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.28]} />
        <meshStandardMaterial color="#888" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Label central */}
      <mesh position={[0, 0, 0.18]}>
        <planeGeometry args={[0.72, 0.9]} />
        <meshStandardMaterial color={labelColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.15, 0.185]}>
        <planeGeometry args={[0.5, 0.18]} />
        <meshStandardMaterial color="#f5c842" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, 0.185]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshStandardMaterial color="#f5c842" roughness={0.9} />
      </mesh>

      {/* Fereastră transparentă */}
      <mesh position={[0, -0.25, 0.178]}>
        <planeGeometry args={[0.45, 0.35]} />
        <meshStandardMaterial color="#e8c87a" roughness={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
