'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from '@react-three/drei';

interface ProductModelProps {
  modelUrl?: string;
}

function ProductModel({ modelUrl }: ProductModelProps) {
  if (modelUrl) {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} position={[0, -1, 0]} />;
  }

  // Fallback to stylized box/cylinder mannequin
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.5, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 0.5, 32]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: '#d4a853', fontFamily: 'sans-serif' }}>Loading...</div>
    </Html>
  );
}

export default function ProductViewer3D({ modelUrl }: ProductModelProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#f5f5f5', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} castShadow />
        <spotLight position={[-5, 5, -5]} intensity={0.5} angle={0.3} penumbra={1} />
        
        <Suspense fallback={<Loader />}>
          <ProductModel modelUrl={modelUrl} />
          <Environment preset="studio" />
        </Suspense>

        <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <OrbitControls autoRotate enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
