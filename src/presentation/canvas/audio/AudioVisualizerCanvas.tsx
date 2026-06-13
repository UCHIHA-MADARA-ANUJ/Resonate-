"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A classic wireframe terrain that undulates as if responding to audio frequencies
function AudioTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const width = 50;
  const depth = 50;
  
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(60, 60, width, depth);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Simulate multiple audio bands
      const lowFreq = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 2.0;
      const midFreq = Math.sin(x * 0.3 - time * 2) * Math.cos(y * 0.2 + time) * 1.0;
      const highFreq = Math.sin(x * 0.8 + time * 5) * Math.cos(y * 0.8 - time * 5) * 0.2;
      
      // Center spike
      const dist = Math.sqrt(x * x + y * y);
      const centerPulse = Math.max(0, 10 - dist) * Math.sin(time * 8) * 0.5;

      positions[i + 2] = lowFreq + midFreq + highFreq + centerPulse;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.x = -Math.PI / 2.2;
    meshRef.current.position.y = -5;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color="#00F0FF" wireframe={true} transparent opacity={0.3} />
    </mesh>
  );
}

export function AudioVisualizerCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        <fog attach="fog" args={['#000000', 5, 30]} />
        <AudioTerrain />
      </Canvas>
    </div>
  );
}
