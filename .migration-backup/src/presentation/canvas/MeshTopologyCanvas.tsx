"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TopologyNodeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  
  const [geoData, setGeoData] = useState<{positions: Float32Array, linePositions: Float32Array} | null>(null);

  useEffect(() => {
    const nodeCount = 300;
    const pos = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];

    // Distribute nodes on a sphere
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const r = 15 + (Math.random() - 0.5) * 4; 
      
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      
      nodes.push(new THREE.Vector3(x, y, z));
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Connect close nodes
    const lPos: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < 6.5) {
          lPos.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    setGeoData({ 
      positions: pos, 
      linePositions: new Float32Array(lPos) 
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.02) * 0.1;
  });

  if (!geoData) return null;

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geoData.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#00F0FF" transparent opacity={0.8} />
      </points>
      
      {/* Edges / Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geoData.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.15} />
      </lineSegments>
      
      {/* Threat Nodes (Red) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geoData.positions.slice(0, 30), 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.3} color="#FF0055" transparent opacity={0.9} />
      </points>
    </group>
  );
}

export function MeshTopologyCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70">
      <Canvas camera={{ position: [0, 0, 35], fov: 45 }}>
        <fog attach="fog" args={['#000000', 10, 50]} />
        <TopologyNodeMesh />
      </Canvas>
    </div>
  );
}
