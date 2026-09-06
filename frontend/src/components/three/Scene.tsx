'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: any;
}

export default function Scene({ children, className, camera = { fov: 45, position: [0, 0, 10] } }: SceneProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 2]} camera={camera}>
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
