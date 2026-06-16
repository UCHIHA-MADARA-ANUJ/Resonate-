

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Wormhole() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 25000;
  
  const [geoData, setGeoData] = useState<{positions: Float32Array, colors: Float32Array} | null>(null);

  useEffect(() => {
    // Generate data on mount to avoid impurity inside render
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorReso = new THREE.Color('#00F0FF');
    const colorShock = new THREE.Color('#FF0055');
    const colorVoid = new THREE.Color('#0B001A');

    for(let i=0; i<count; i++) {
      const z = Math.random() * 200 - 150;
      const noise = (Math.random() - 0.5) * 2.0;
      const radius = 4 + Math.random() * 3 + noise;
      const angle = Math.random() * Math.PI * 2;
      
      pos[i*3] = Math.cos(angle) * radius;
      pos[i*3+1] = Math.sin(angle) * radius;
      pos[i*3+2] = z;

      const mixRatio = Math.random();
      let finalColor;
      if (mixRatio < 0.6) {
        finalColor = colorReso.clone().lerp(colorVoid, Math.random() * 0.5);
      } else {
        finalColor = colorShock.clone().lerp(colorVoid, Math.random() * 0.5);
      }

      col[i*3] = finalColor.r;
      col[i*3+1] = finalColor.g;
      col[i*3+2] = finalColor.b;
    }
    setGeoData({ positions: pos, colors: col });
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !geoData) return;
    const time = state.clock.getElapsedTime();
    
    // Slow cinematic rotation of the entire tunnel
    pointsRef.current.rotation.z = time * 0.05;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Accelerate the speed as time goes on to build tension
    const speed = 0.1 + (time * 0.02);

    for(let i=0; i<count; i++) {
      posArray[i*3+2] += speed;
      
      // If particle passes behind the camera, reset it far into the distance
      if (posArray[i*3+2] > 10) {
        posArray[i*3+2] = -190;
      }
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
        size={0.035} 
        vertexColors={true} 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
}

export function CinematicLoaderCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen bg-black">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        {/* Deep cinematic fog to hide the end of the tunnel */}
        <fog attach="fog" args={['#000000', 5, 80]} />
        <Wormhole />
      </Canvas>
    </div>
  );
}
