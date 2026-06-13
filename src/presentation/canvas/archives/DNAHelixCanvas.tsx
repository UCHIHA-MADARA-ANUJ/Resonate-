"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DNAHelix() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const [geoData, setGeoData] = useState<{positions: Float32Array, colors: Float32Array} | null>(null);

  useEffect(() => {
    // Generate data on mount to avoid impurity inside render
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorA = new THREE.Color('#00F0FF'); // Cyan
    const colorB = new THREE.Color('#FF0055'); // Magenta

    const noiseX = Array.from({length: count}, () => (Math.random() - 0.5) * 0.5);
    const noiseY = Array.from({length: count}, () => (Math.random() - 0.5) * 0.5);
    const noiseZ = Array.from({length: count}, () => (Math.random() - 0.5) * 0.5);

    for(let i=0; i<count; i++) {
      const t = i / count * Math.PI * 40; 
      const isStrandA = i % 2 === 0;
      
      const radius = 3;
      const x = Math.cos(t + (isStrandA ? 0 : Math.PI)) * radius;
      const y = (i / count) * 40 - 20; 
      const z = Math.sin(t + (isStrandA ? 0 : Math.PI)) * radius;
      
      pos[i*3] = x + noiseX[i];
      pos[i*3+1] = y + noiseY[i];
      pos[i*3+2] = z + noiseZ[i];

      const c = isStrandA ? colorA : colorB;
      col[i*3] = c.r;
      col[i*3+1] = c.g;
      col[i*3+2] = c.b;
    }
    setGeoData({ positions: pos, colors: col });
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.2;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Undulate
    for(let i=0; i<count; i++) {
      const y = posArray[i*3+1];
      const offset = Math.sin(y * 0.5 + time) * 0.01;
      posArray[i*3] += offset;
      posArray[i*3+2] += offset;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!geoData) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geoData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[geoData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors={true} 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
}

export function DNAHelixCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <fog attach="fog" args={['#000000', 10, 30]} />
        <DNAHelix />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}
