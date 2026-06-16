

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 3000;
  
  const { positions, IndiaIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ind: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const r = 10;
      
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Extremely rough geographic bounds for "India" on a sphere
      // Usually, latitude (phi) and longitude (theta) mapped to xyz
      // We'll just randomly select a cluster to glow like a hotspot
      if (x > 2 && x < 8 && y > 2 && y < 8 && z > 0) {
        ind.push(i);
      }
    }
    return { positions: pos, IndiaIndices: ind };
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color("#111111");
    const activeColor = new THREE.Color("#00F0FF");
    
    for (let i = 0; i < count; i++) {
      if (IndiaIndices.includes(i)) {
        // Hotspot
        col[i*3] = activeColor.r;
        col[i*3+1] = activeColor.g;
        col[i*3+2] = activeColor.b;
      } else {
        // Base globe
        col[i*3] = baseColor.r;
        col[i*3+1] = baseColor.g;
        col[i*3+2] = baseColor.b;
      }
    }
    return col;
  }, [count, IndiaIndices]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Rotate the globe slowly to show the India hotspot
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.x = 0.2; // Tilt axis
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors={true} transparent opacity={0.8} />
      </points>
      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[10.2, 32, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function GlobeCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <fog attach="fog" args={['#000000', 15, 40]} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
