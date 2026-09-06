'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundMeshProps {
  scrollProgress?: number;
}

export default function BackgroundMesh({ scrollProgress = 0 }: BackgroundMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.z += delta * 0.05;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      meshRef.current.position.y = -scrollProgress * 5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <icosahedronGeometry args={[8, 1]} />
      <meshStandardMaterial 
        color="#d4a853" 
        wireframe={true} 
        transparent 
        opacity={0.15} 
      />
    </mesh>
  );
}
