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
  const spheresRef = useRef<THREE.InstancedMesh>(null);

  // Buffer for 32 edges * 2 points * 3 coords = 192 floats
  const linePositions = useMemo(() => new Float32Array(32 * 2 * 3), []);
  const lineColors = useMemo(() => {
    const colors = new Float32Array(32 * 2 * 3);
    const ivory = new THREE.Color('#EEEAD7');
    const crimson = new THREE.Color('#6D0808');

    for (let i = 0; i < 32 * 2; i++) {
      const c = (i % 4 === 0) ? crimson : ivory;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 4D Rotation angles
  const angles = useRef({ xw: 0, yw: 0, zw: 0, xy: 0 });

  useFrame((state, delta) => {
    // Continuous 4D hyper-rotations
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;

    angles.current.xw += delta * (0.35 + Math.abs(mouseX) * 0.2);
    angles.current.yw += delta * (0.28 + Math.abs(mouseY) * 0.2);
    angles.current.zw += delta * 0.15;
    angles.current.xy += delta * 0.2;

    const { xw, yw, zw } = angles.current;
    const cosXW = Math.cos(xw), sinXW = Math.sin(xw);
    const cosYW = Math.cos(yw), sinYW = Math.sin(yw);
    const cosZW = Math.cos(zw), sinZW = Math.sin(zw);

    // Project all 16 4D vertices into 3D
    const projected: [number, number, number][] = [];
    const distance4D = 2.4;
    const scale = 2.8;

    for (let i = 0; i < 16; i++) {
      let [x, y, z, w] = VERTICES_4D[i];

      // 4D Rotation in XW plane
      const x1 = x * cosXW - w * sinXW;
      const w1 = x * sinXW + w * cosXW;

      // 4D Rotation in YW plane
      const y2 = y * cosYW - w1 * sinYW;
      const w2 = y * sinYW + w1 * cosYW;

      // 4D Rotation in ZW plane
      const z3 = z * cosZW - w2 * sinZW;
      const w3 = z * sinZW + w2 * cosZW;

      // Perspective projection from 4D -> 3D
      const factor = 1 / (distance4D - w3 * 0.6);
      const projX = x1 * factor * scale;
      const projY = y2 * factor * scale;
      const projZ = z3 * factor * scale;

      projected.push([projX, projY, projZ]);

      // Update instanced sphere vertex positions
      if (spheresRef.current) {
        dummy.position.set(projX, projY, projZ);
        const sphereScale = 0.08 * (1 + factor * 0.5);
        dummy.scale.set(sphereScale, sphereScale, sphereScale);
        dummy.updateMatrix();
        spheresRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    if (spheresRef.current) {
      spheresRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update 32 edge lines
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

    // Subtle 3D group tilt based on mouse pointer
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.8, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.8, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 32 Wireframe projected edges */}
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
          opacity={0.85}
          linewidth={1.5}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 16 Metallic Chrome Vertices */}
      <instancedMesh
        ref={spheresRef}
        args={[undefined, undefined, 16]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#EEEAD7"
          metalness={0.95}
          roughness={0.1}
          emissive="#6D0808"
          emissiveIntensity={0.25}
        />
      </instancedMesh>

      {/* Central Pulsing Crimson Core Core */}
      <mesh scale={0.45}>
        <octahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#6D0808"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export const TesseractCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.4} />
        {/* Warm Ivory Rim Light */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#EEEAD7" />
        <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#757D6F" />
        {/* Rich Crimson Center Glow Light */}
        <pointLight position={[0, 0, 0]} intensity={3.5} distance={10} color="#6D0808" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <HypercubeMesh />
        </Float>
      </Canvas>
    </div>
  );
};

export default TesseractCanvas;
