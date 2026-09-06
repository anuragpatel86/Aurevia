'use client';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
attribute float aScale;
attribute vec3 aRandomness;
uniform float uTime;
uniform float uSize;
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceFromCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceFromCenter) * uTime * 0.2;
    float cosAngle = cos(angle + angleOffset);
    float sinAngle = sin(angle + angleOffset);
    modelPosition.x = cosAngle * distanceFromCenter;
    modelPosition.z = sinAngle * distanceFromCenter;
    modelPosition.xyz += aRandomness;
    modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 0.5) * 0.3;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
    gl_PointSize = max(gl_PointSize, 1.0);
    vColor = vec3(0.85, 0.75, 0.55);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    alpha *= 0.6;
    gl_FragColor = vec4(vColor, alpha);
}
`;

export default function ParticleField({ count = 8000 }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * 5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = Math.random();

      randomness[i * 3] = (Math.random() - 0.5) * 0.5;
      randomness[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      randomness[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    return { positions, scales, randomness };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 30.0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={particles.scales} itemSize={1} />
        <bufferAttribute attach="attributes-aRandomness" count={count} array={particles.randomness} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
