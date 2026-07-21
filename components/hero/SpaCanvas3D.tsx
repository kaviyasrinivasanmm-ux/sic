'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial, OrbitControls, Sparkles as DreiSparkles } from '@react-three/drei'
import * as THREE from 'three'

function ZenStonesStack() {
  const groupRef = useRef<THREE.Group>(null!)
  const candleFlameRef = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.08
    }
    if (candleFlameRef.current) {
      candleFlameRef.current.intensity = 2.5 + Math.sin(t * 12) * 0.4 + Math.cos(t * 19) * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Bottom Stone */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.7, 0.4, 32]} />
        <meshStandardMaterial color="#222B27" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Middle Stone */}
      <mesh position={[0, 0.45, 0.1]} rotation={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.3, 0.38, 32]} />
        <meshStandardMaterial color="#35443D" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Top Stone */}
      <mesh position={[0, 0.85, 0.05]} rotation={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.95, 0.32, 32]} />
        <meshStandardMaterial color="#4A5C52" roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Golden Lotus Blossom / Pebble Accent */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 1.25, 0]}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#C5A059" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      {/* Candle Flame Glow */}
      <pointLight
        ref={candleFlameRef}
        position={[1.2, 0.4, 0.8]}
        color="#E7C88C"
        intensity={3}
        distance={6}
      />
      <mesh position={[1.2, 0.2, 0.8]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.1} />
      </mesh>
    </group>
  )
}

function FloatingAromaParticles() {
  return (
    <DreiSparkles
      count={40}
      scale={[10, 6, 10]}
      size={4}
      speed={0.4}
      opacity={0.7}
      color="#C5A059"
    />
  )
}

function WaterReflectivePlane() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = -1.2 + Math.sin(t * 0.8) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <MeshWobbleMaterial
        color="#1D2A22"
        roughness={0.1}
        metalness={0.8}
        factor={0.1}
        speed={1.5}
      />
    </mesh>
  )
}

export default function SpaCanvas3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.2, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.8} color="#FDFBF7" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#FAF4E6"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-4, 3, -3]} intensity={1.2} color="#5A7365" />
        <pointLight position={[3, -1, 2]} intensity={1} color="#C5A059" />

        <ZenStonesStack />
        <WaterReflectivePlane />
        <FloatingAromaParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
