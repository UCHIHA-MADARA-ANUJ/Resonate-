

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function ParticleWave() {
  const ref = useRef<THREE.Points>(null);
  const count = 5000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      const r = Math.random() * 5 + 2;

      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = time * 0.02;

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Wave effect based on distance from center
      const dist = Math.sqrt(x*x + y*y + z*z);
      const wave = Math.sin(dist * 2 - time * 3) * 0.02;
      
      positions[i3] += x * wave;
      positions[i3 + 1] += y * wave;
      positions[i3 + 2] += z * wave;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00F0FF" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        <ParticleWave />
      </Canvas>
      {/* Vignette to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)]" />
    </div>
  );
}
