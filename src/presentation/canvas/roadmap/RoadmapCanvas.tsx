"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

function SplineRoad() {
  const lineRef = useRef<THREE.Line>(null);
  
  const curve = useMemo(() => {
    // Generate a massive winding 3D path down the Z-axis
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.5) * 10,
        Math.cos(i * 0.3) * 5,
        -i * 20 // Journey down negative Z
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const points = useMemo(() => curve.getPoints(500), [curve]);
  
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <group>
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#00F0FF", linewidth: 2, transparent: true, opacity: 0.5 }))} />
      {/* Add glowing nodes along the path */}
      {curve.points.map((p, i) => (
        i % 5 === 0 && (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#FF0055" />
          </mesh>
        )
      ))}
    </group>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: any }) {
  useFrame((state) => {
    // We map the 0-1 scroll progress to a deep Z-axis camera flight
    // Z starts at 10, ends at -900
    const targetZ = 10 - (scrollProgress.get() * 950);
    
    // Add some cinematic wobble to X and Y
    const wobbleX = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    const wobbleY = Math.cos(state.clock.elapsedTime * 0.3) * 2;
    
    state.camera.position.lerp(new THREE.Vector3(wobbleX, wobbleY, targetZ), 0.1);
    
    // Always look slightly ahead and down
    const lookAtZ = state.camera.position.z - 50;
    state.camera.lookAt(0, 0, lookAtZ);
  });
  return null;
}

export function RoadmapCanvas({ scrollProgress }: { scrollProgress: any }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#000000', 10, 100]} />
        <SplineRoad />
        <CameraController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
