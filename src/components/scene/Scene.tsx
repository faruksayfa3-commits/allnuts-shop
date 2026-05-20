'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import { Suspense } from 'react'
import { SeedBag } from './SeedBag'
import { SeedParticles } from './Particles'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-4, 3, 4]} color="#ff9500" intensity={1.5} />
      <pointLight position={[4, -2, 2]} color="#ffcc44" intensity={0.8} />
      <hemisphereLight args={['#ff9800', '#1a0a00', 0.4]} />
    </>
  )
}

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lights />

          {/* Punga centrală - cea care se "deschide" */}
          <SeedBag position={[0, 0.3, 0]} index={1} />

          {/* Pungi în flanc */}
          <SeedBag position={[-3, -0.2, -2]} index={0} />
          <SeedBag position={[3, 0.4, -1.5]} index={2} />

          {/* Semințele care explodează */}
          <SeedParticles />

          <Environment preset="sunset" />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.3}
            scale={12}
            blur={2.5}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
