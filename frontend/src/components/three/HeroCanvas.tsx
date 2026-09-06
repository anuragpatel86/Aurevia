'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import ParticleField from './ParticleField';

function MouseReactiveGeometry() {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;
      
      meshRef.current.position.x += (targetX * 0.1 - meshRef.current.position.x) * delta * 2;
      meshRef.current.position.y += (targetY * 0.1 - meshRef.current.position.y) * delta * 2;
      
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <torusKnotGeometry args={[1.5, 0.4, 128, 64]} />
          <meshStandardMaterial color="#d4a853" wireframe={true} transparent opacity={0.3} />
        </mesh>
        <mesh scale={[0.98, 0.98, 0.98]}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 64]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a', position: 'relative' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#d4a853" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={1} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ParticleField count={8000} />
        <MouseReactiveGeometry />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '5rem', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(212, 168, 83, 0.5)', margin: 0, textAlign: 'center' }}>Luxe Threads</h1>
        <p style={{ color: '#d4a853', fontSize: '1.2rem', letterSpacing: '0.1em', marginTop: '1rem', textAlign: 'center' }}>Elevating Digital Fashion</p>
      </div>
    </div>
  );
}
