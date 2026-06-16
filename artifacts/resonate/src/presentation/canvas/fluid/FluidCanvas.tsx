

import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// An insanely aggressive, mathematical flowing particle system
// Uses custom WGSL-like logic in JS to avoid loader issues in Turbopack for this iteration
function FluidSwarm() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 10000;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.02 + 0.01,
        xMult: Math.random() * 20 - 10,
        yMult: Math.random() * 20 - 10,
        zMult: Math.random() * 20 - 10,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      
      // Complex Lissajous curve / fluid motion
      const x = Math.sin(particle.t * particle.factor) * particle.xMult;
      const y = Math.cos(particle.t * 0.8) * particle.yMult;
      const z = Math.sin(particle.t * 1.2) * particle.zMult;

      dummy.position.set(x, y, z);
      
      // Look forward along trajectory
      const dx = Math.cos(particle.t * particle.factor) * particle.factor * particle.xMult;
      const dy = -Math.sin(particle.t * 0.8) * 0.8 * particle.yMult;
      const dz = Math.cos(particle.t * 1.2) * 1.2 * particle.zMult;
      dummy.lookAt(x + dx, y + dy, z + dz);
      
      const scale = (Math.sin(particle.t * 5) + 1.5) * 0.1;
      dummy.scale.set(scale, scale, scale * 4); // Stretch it to look like a spark

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Color shifts based on position
      const color = new THREE.Color();
      const mixRatio = (Math.sin(particle.t * 2) + 1) / 2;
      color.lerpColors(new THREE.Color("#00F0FF"), new THREE.Color("#FF0055"), mixRatio);
      meshRef.current!.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    
    // Rotate the entire swarm slowly
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

export function FluidCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <fog attach="fog" args={['#000000', 10, 40]} />
        <FluidSwarm />
      </Canvas>
    </div>
  );
}
