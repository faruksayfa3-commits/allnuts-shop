'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { SeedBag3D } from './SeedBag'
import { SunflowerSeeds } from './SunflowerSeed'
import { PahareScene } from './PaharScene'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// 5 pungi cu culori reale AllNuts
const BAGS = [
  { position: [-3.5, 0.5, -2] as [number,number,number], index: 0, color: '#7B3B8C', isGold: false },  // mov
  { position: [-1.5, -0.3, -0.5] as [number,number,number], index: 1, color: '#C0392B', isGold: false }, // rosu
  { position: [0, 0.8, 0] as [number,number,number], index: 2, color: '#D4A017', isGold: true },          // gold (central)
  { position: [1.8, -0.2, -0.5] as [number,number,number], index: 3, color: '#7B3B8C', isGold: false },  // mov
  { position: [3.5, 0.4, -1.8] as [number,number,number], index: 4, color: '#C0392B', isGold: false },   // rosu
]

function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#ffffff"
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#ffe8e0" />
      <pointLight position={[0, 4, 4]} color="#ffcc44" intensity={1.5} />
      <hemisphereLight args={['#fff5ee', '#ffeedd', 0.6]} />
    </>
  )
}

// Controlează ce se vede pe scenă în funcție de secțiune
function SceneController() {
  const [section, setSection] = useState<'bags' | 'seeds' | 'pahare'>('bags')

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#product-reveal',
      start: 'top center',
      onEnter: () => setSection('seeds'),
      onLeaveBack: () => setSection('bags'),
    })
    ScrollTrigger.create({
      trigger: '#pahare-section',
      start: 'top center',
      onEnter: () => setSection('pahare'),
      onLeaveBack: () => setSection('seeds'),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      {/* Pungi — vizibile întotdeauna în faza bags */}
      <group visible={section !== 'pahare'}>
        {BAGS.map((bag) => (
          <SeedBag3D key={bag.index} {...bag} />
        ))}
        {section === 'seeds' && <SunflowerSeeds />}
      </group>

      {/* Pahare — vizibile doar în faza pahare */}
      {section === 'pahare' && <PahareScene />}
    </>
  )
}

export function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lights />
          <SceneController />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.25}
            scale={14}
            blur={3}
            far={5}
            color="#cc0000"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
