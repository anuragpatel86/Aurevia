'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingFabric() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Animate vertices for fabric-like wave
      const positionAttribute = meshRef.current.geometry.getAttribute('position');
      const vertex = new THREE.Vector3();
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        vertex.z = Math.sin(vertex.x * 2 + state.clock.elapsedTime) * 0.5 + 
                   Math.cos(vertex.y * 2 + state.clock.elapsedTime) * 0.5;
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={2}>
        <planeGeometry args={[10, 10, 32, 32]} />
        <meshStandardMaterial 
          color="#d4a853" 
          roughness={0.4} 
          metalness={0.6}
          side={THREE.DoubleSide}
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#d4a853" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <FloatingFabric />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={50} scale={10} size={2} speed={0.4} color="#d4a853" opacity={0.5} />
      
      <Environment preset="city" />
    </Canvas>
  );
}
