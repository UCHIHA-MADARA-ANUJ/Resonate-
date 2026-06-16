"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
// @ts-ignore
import vertexShader from "../shaders/singularity.vert";
// @ts-ignore
import fragmentShader from "../shaders/singularity.frag";

function SingularitySwarm() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  // We don't do small numbers. 150,000 particles for absolute overkill.
  const count = 150000;
  
  const [geoData, setGeoData] = useState<{positions: Float32Array, randoms: Float32Array, sizes: Float32Array, speeds: Float32Array, angles: Float32Array} | null>(null);

  useEffect(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * Math.random() * 30 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (radius * 0.2);
      
      rand[i * 3] = Math.random();
      rand[i * 3 + 1] = Math.random();
      rand[i * 3 + 2] = Math.random();
      
      sz[i] = Math.random() * 1.5 + 0.1;
      spd[i] = Math.random() * 2.0 + 0.5;
      ang[i] = theta;
    }
    setGeoData({ positions: pos, randoms: rand, sizes: sz, speeds: spd, angles: ang });
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseVelocity: { value: 0.0 }
  }), []);

  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));
  const previousMouse = useRef(new THREE.Vector2(0, 0));
  const mouseVelocity = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Aspect ratio correction mapping
      targetMouse.current.x *= viewport.width / 2;
      targetMouse.current.y *= viewport.height / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    
    // Calculate raw mouse velocity for aggressive shader physics
    const dx = targetMouse.current.x - previousMouse.current.x;
    const dy = targetMouse.current.y - previousMouse.current.y;
    const instVelocity = Math.sqrt(dx * dx + dy * dy) / delta;
    
    // Smooth out the velocity reading
    mouseVelocity.current = THREE.MathUtils.lerp(mouseVelocity.current, Math.min(instVelocity * 0.001, 2.0), 0.1);
    
    previousMouse.current.copy(targetMouse.current);
    
    // Smooth mouse position tracking
    currentMouse.current.lerp(targetMouse.current, 0.08);
    
    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    materialRef.current.uniforms.uMouseVelocity.value = mouseVelocity.current;
  });

  if (!geoData) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geoData.positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[geoData.randoms, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[geoData.sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[geoData.speeds, 1]} />
        <bufferAttribute attach="attributes-aAngle" args={[geoData.angles, 1]} />
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

export function SingularityCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-100 bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <SingularitySwarm />
        
        {/* God-Tier Post-Processing Pipeline */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            intensity={2.5} 
            mipmapBlur 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.002, 0.002)} 
          />
          <Noise 
            premultiply 
            blendFunction={BlendFunction.ADD} 
            opacity={0.3} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
