"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import vertexShader from "../shaders/glass.vert";
// @ts-ignore
import fragmentShader from "../shaders/glass.frag";

function PrismObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    
    // Complex, heavy rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      {/* Massive Icosahedron for that expensive "tech monolith" look */}
      <icosahedronGeometry args={[4, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        wireframe={true}
      />
      {/* Inner solid core */}
      <mesh scale={0.95}>
        <icosahedronGeometry args={[4, 0]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </mesh>
  );
}

export function PrismCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <PrismObject />
      </Canvas>
    </div>
  );
}
