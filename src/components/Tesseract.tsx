import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function TesseractMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const outerCubeRef = useRef<THREE.Mesh>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const middleCoreRef = useRef<THREE.Mesh>(null);

  // 8 diagonal hypercube edges connecting outer cube corners to inner cube corners
  const linePositions = useMemo(() => {
    const pos = new Float32Array(8 * 2 * 3);
    const sOuter = 1.7;
    const sInner = 0.85;
    let idx = 0;
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          // outer corner
          pos[idx++] = x * sOuter;
          pos[idx++] = y * sOuter;
          pos[idx++] = z * sOuter;
          // inner corner
          pos[idx++] = x * sInner;
          pos[idx++] = y * sInner;
          pos[idx++] = z * sInner;
        }
      }
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x += delta * 0.2;

      const mouseX = state.pointer.x * 0.6;
      const mouseY = state.pointer.y * 0.6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        groupRef.current.rotation.y + mouseX * 0.04,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        groupRef.current.rotation.x - mouseY * 0.04,
        0.1
      );
    }

    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * 0.45;
      innerCubeRef.current.rotation.z += delta * 0.35;
    }

    if (middleCoreRef.current) {
      middleCoreRef.current.rotation.x += delta * 0.6;
      middleCoreRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Hypercube Wireframe Box - High-Contrast Jet Black */}
      <mesh ref={outerCubeRef}>
        <boxGeometry args={[3.4, 3.4, 3.4]} />
        <meshStandardMaterial color="#0F0F0F" wireframe={true} />
      </mesh>

      {/* Inner Hypercube Wireframe Box - High-Contrast Jet Black */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial color="#0F0F0F" wireframe={true} />
      </mesh>

      {/* 8 Connecting Diagonal Hypercube Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0F0F0F" linewidth={2} />
      </lineSegments>

      {/* Outer 8 Corner Vertex Markers (Black Cubes) */}
      {[-1.7, 1.7].map((x) =>
        [-1.7, 1.7].map((y) =>
          [-1.7, 1.7].map((z) => (
            <mesh key={`out-${x}-${y}-${z}`} position={[x, y, z]}>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
              <meshBasicMaterial color="#0F0F0F" />
            </mesh>
          ))
        )
      )}

      {/* Inner 8 Corner Vertex Markers (Graffiti Red Cubes) */}
      {[-0.85, 0.85].map((x) =>
        [-0.85, 0.85].map((y) =>
          [-0.85, 0.85].map((z) => (
            <mesh key={`in-${x}-${y}-${z}`} position={[x, y, z]}>
              <boxGeometry args={[0.14, 0.14, 0.14]} />
              <meshBasicMaterial color="#FF2A00" />
            </mesh>
          ))
        )
      )}

      {/* Center Dynamic Core in Wireframe */}
      <mesh ref={middleCoreRef} scale={0.75}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#FF2A00" wireframe={true} />
      </mesh>

      {/* Ambient Blueprint Wireframe Orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 2.74, 32]} />
        <meshBasicMaterial color="#0F0F0F" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export const TesseractCanvas: React.FC = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 7.8], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-5, -10, -7]} intensity={1.5} color="#FFFFFF" />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <TesseractMesh />
      </Float>
    </Canvas>
  );
};

export default TesseractCanvas;
