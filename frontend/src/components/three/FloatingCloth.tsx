'use client';
import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAmplitude;

void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = sin(pos.x * 3.0 + uTime * 0.8) * uAmplitude;
    float wave2 = sin(pos.y * 2.5 + uTime * 0.6) * uAmplitude * 0.8;
    float wave3 = cos(pos.x * 1.5 + pos.y * 2.0 + uTime * 0.4) * uAmplitude * 0.5;
    float mouseEffect = smoothstep(0.5, 0.0, distance(uv, uMouse)) * 0.3;
    pos.z += wave1 + wave2 + wave3 + mouseEffect;
    vDisplacement = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
    vec3 color = mix(uColor1, uColor2, vUv.y * 0.5 + vDisplacement * 2.0);
    float shimmer = sin(vUv.x * 50.0 + uTime * 2.0) * 0.05 + 0.95;
    color *= shimmer;
    float alpha = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y) * smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    gl_FragColor = vec4(color, alpha);
}
`;

export default function FloatingCloth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();
  const [mousePos] = useState(new THREE.Vector2());

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uAmplitude: { value: 0.3 },
    uColor1: { value: new THREE.Color('#0a0a0a') },
    uColor2: { value: new THREE.Color('#d4a853') }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      mousePos.x += (mouse.x * 0.5 + 0.5 - mousePos.x) * delta * 5;
      mousePos.y += (mouse.y * 0.5 + 0.5 - mousePos.y) * delta * 5;
      materialRef.current.uniforms.uMouse.value.copy(mousePos);
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.x = -Math.PI * 0.2 + Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
