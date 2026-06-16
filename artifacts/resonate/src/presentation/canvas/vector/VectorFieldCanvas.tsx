

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function VectorField() {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  const gridSize = 30; // 30x30 grid
  const count = gridSize * gridSize;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Map to roughly -15 to 15
        pos[i * 3] = (x - gridSize / 2) * 1.2;
        pos[i * 3 + 1] = (y - gridSize / 2) * 1.2;
        pos[i * 3 + 2] = 0;
        i++;
      }
    }
    return { positions: pos };
  }, [count]);

  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouse.current.x *= viewport.width / 2;
      targetMouse.current.y *= viewport.height / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  useFrame(() => {
    if (!instancedMeshRef.current) return;
    
    currentMouse.current.lerp(targetMouse.current, 0.1);

    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];
        
        dummy.position.set(px, py, pz);
        
        // Calculate angle to mouse
        const dx = currentMouse.current.x - px;
        const dy = currentMouse.current.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Only react if within range
        const influence = Math.max(0, 1.0 - dist / 10.0);
        
        const angle = Math.atan2(dy, dx);
        
        // Rotate arrow to point at mouse, intensity based on distance
        dummy.rotation.z = angle * influence;
        
        // Scale up when mouse is near
        const scale = 1.0 + influence * 2.0;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
        
        // Color based on influence (Cyan to Shock Magenta)
        const color = new THREE.Color();
        color.lerpColors(new THREE.Color("#00F0FF"), new THREE.Color("#FF0055"), influence);
        instancedMeshRef.current.setColorAt(i, color);
        
        i++;
      }
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      {/* Arrow shape */}
      <coneGeometry args={[0.1, 0.4, 3]} />
      <meshBasicMaterial color="#00F0FF" wireframe={true} />
    </instancedMesh>
  );
}

export function VectorFieldCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-40">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <VectorField />
      </Canvas>
    </div>
  );
}
