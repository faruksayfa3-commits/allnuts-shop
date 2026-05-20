'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { SeedBag3D } from './SeedBag'
import { SunflowerSeeds } from './SunflowerSeed'
import { PahareScene } from './PaharScene'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mouse parallax pe întreaga scenă
function MouseParallax() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.04
    target.current.y += (mouse.current.y - target.current.y) * 0.04
    camera.position.x = target.current.x * 0.6
    camera.position.y = target.current.y * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Particule de fond — atmosferă
function AtmosphereParticles() {
  const meshRef = useRef<THREE.Points>(null)

  const [positions] = useState(() => {
    const count = 300
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
  })

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#EC1C24"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  )
}

// Grila de fond (tip ohzi)
function GridFloor() {
  return (
    <group position={[0, -4, 0]} rotation={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[40, 40, 20, 20]} />
        <meshBasicMaterial
          color="#EC1C24"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  )
}

const BAGS = [
  { position: [-3.8, 0.4, -1.5] as [number,number,number], index: 0, bagColor: '#5c1a6e', isGold: false },
  { position: [-1.6, -0.2, -0.3] as [number,number,number], index: 1, bagColor: '#8B1A22', isGold: false },
  { position: [ 0.1, 0.9,  0.5] as [number,number,number], index: 2, bagColor: '#B8860B', isGold: true  },
  { position: [ 1.9, -0.3, -0.5] as [number,number,number], index: 3, bagColor: '#5c1a6e', isGold: false },
  { position: [ 3.8, 0.5, -1.8] as [number,number,number], index: 4, bagColor: '#8B1A22', isGold: false },
]

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a0505" />
      <pointLight position={[0, 6, 4]} intensity={3} color="#EC1C24" distance={20} decay={2} />
      <pointLight position={[-5, 2, 2]} intensity={1.5} color="#ff4444" distance={15} decay={2} />
      <pointLight position={[5, 2, 2]} intensity={1.5} color="#ff2222" distance={15} decay={2} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <hemisphereLight args={['#1a0000', '#000000', 0.3]} />
    </>
  )
}

function SceneContent() {
  const [phase, setPhase] = useState<'bags' | 'seeds' | 'pahare'>('bags')

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#product-reveal',
      start: 'top center',
      onEnter: () => setPhase('seeds'),
      onLeaveBack: () => setPhase('bags'),
    })
    ScrollTrigger.create({
      trigger: '#pahare-section',
      start: 'top center',
      onEnter: () => setPhase('pahare'),
      onLeaveBack: () => setPhase('seeds'),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <AtmosphereParticles />
      <GridFloor />
      <MouseParallax />

      <group visible={phase !== 'pahare'}>
        {BAGS.map(b => <SeedBag3D key={b.index} {...b} />)}
        {phase === 'seeds' && <SunflowerSeeds />}
      </group>

      {phase === 'pahare' && <PahareScene />}
    </>
  )
}

export function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 46 }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: '#080808' }}
      >
        <fog attach="fog" args={['#080808', 12, 30]} />
        <Suspense fallback={null}>
          <Lights />
          <SceneContent />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
