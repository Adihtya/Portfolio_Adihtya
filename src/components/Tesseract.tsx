import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 16 4D vertices of a hypercube: (+-1, +-1, +-1, +-1)
const VERTICES_4D: [number, number, number, number][] = [];
for (let i = 0; i < 16; i++) {
  VERTICES_4D.push([
    (i & 1 ? 1 : -1),
    (i & 2 ? 1 : -1),
    (i & 4 ? 1 : -1),
    (i & 8 ? 1 : -1),
  ]);
}

// 32 edges connecting vertices that differ by exactly 1 coordinate
const EDGES_4D: [number, number][] = [];
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    const diff =
      (VERTICES_4D[i][0] !== VERTICES_4D[j][0] ? 1 : 0) +
      (VERTICES_4D[i][1] !== VERTICES_4D[j][1] ? 1 : 0) +
      (VERTICES_4D[i][2] !== VERTICES_4D[j][2] ? 1 : 0) +
      (VERTICES_4D[i][3] !== VERTICES_4D[j][3] ? 1 : 0);
    if (diff === 1) {
      EDGES_4D.push([i, j]);
    }
  }
}

function HypercubeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const boxesRef = useRef<THREE.InstancedMesh>(null);

  // Buffer for 32 edges * 2 points * 3 coords = 192 floats
  const linePositions = useMemo(() => new Float32Array(32 * 2 * 3), []);
  const lineColors = useMemo(() => {
    const colors = new Float32Array(32 * 2 * 3);
    const black = new THREE.Color('#0F0F0F');
    const red = new THREE.Color('#FF2A00');
    const blue = new THREE.Color('#0033FF');

    for (let i = 0; i < 32 * 2; i++) {
      let c = black;
      if (i % 8 === 0) c = red;
      if (i % 8 === 4) c = blue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const angles = useRef({ xw: 0, yw: 0, zw: 0, xy: 0 });

  useFrame((state, delta) => {
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    angles.current.xw += delta * (0.3 + Math.abs(mouseX) * 0.2);
    angles.current.yw += delta * (0.24 + Math.abs(mouseY) * 0.2);
    angles.current.zw += delta * 0.12;

    const { xw, yw, zw } = angles.current;
    const cosXW = Math.cos(xw), sinXW = Math.sin(xw);
    const cosYW = Math.cos(yw), sinYW = Math.sin(yw);
    const cosZW = Math.cos(zw), sinZW = Math.sin(zw);

    const projected: [number, number, number][] = [];
    const distance4D = 2.4;
    const scale = 2.6;

    for (let i = 0; i < 16; i++) {
      let [x, y, z, w] = VERTICES_4D[i];

      const x1 = x * cosXW - w * sinXW;
      const w1 = x * sinXW + w * cosXW;

      const y2 = y * cosYW - w1 * sinYW;
      const w2 = y * sinYW + w1 * cosYW;

      const z3 = z * cosZW - w2 * sinZW;
      const w3 = z * sinZW + w2 * cosZW;

      const factor = 1 / (distance4D - w3 * 0.6);
      const projX = x1 * factor * scale;
      const projY = y2 * factor * scale;
      const projZ = z3 * factor * scale;

      projected.push([projX, projY, projZ]);

      if (boxesRef.current) {
        dummy.position.set(projX, projY, projZ);
        const boxScale = 0.08 * (1 + factor * 0.4);
        dummy.scale.set(boxScale, boxScale, boxScale);
        dummy.updateMatrix();
        boxesRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    if (boxesRef.current) {
      boxesRef.current.instanceMatrix.needsUpdate = true;
    }

    if (linesRef.current) {
      let ptr = 0;
      for (let i = 0; i < EDGES_4D.length; i++) {
        const [p1Idx, p2Idx] = EDGES_4D[i];
        const p1 = projected[p1Idx];
        const p2 = projected[p2Idx];

        linePositions[ptr++] = p1[0];
        linePositions[ptr++] = p1[1];
        linePositions[ptr++] = p1[2];

        linePositions[ptr++] = p2[0];
        linePositions[ptr++] = p2[1];
        linePositions[ptr++] = p2[2];
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.6, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.6, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Raw Ink Sketched Wireframe Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.8}
          linewidth={2}
        />
      </lineSegments>

      {/* Sketched Brutalist Rectangular Vertices */}
      <instancedMesh
        ref={boxesRef}
        args={[undefined, undefined, 16]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#0F0F0F" />
      </instancedMesh>

      {/* Sketched Center Core Cube */}
      <mesh scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#FF2A00"
          wireframe
        />
      </mesh>
    </group>
  );
}

export const TesseractCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1} />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <HypercubeMesh />
        </Float>
      </Canvas>
    </div>
  );
};

export default TesseractCanvas;
