"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Simple astronaut mascot (replace with GLTF/GLB model for more detail)
function AstronautMascot() {
  const group = useRef<THREE.Group>(null!);
  // Waving animation
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.2) * 0.2 + 0.2;
      group.current.rotation.y = mouse.x * 0.7;
      group.current.rotation.x = mouse.y * 0.3;
    }
  });
  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 0.15, 0.45]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#b0c4de" transparent opacity={0.7} />
      </mesh>
      {/* Left Arm (waving) */}
      <mesh position={[-0.55, 0.1 + Math.sin(Date.now() * 0.002) * 0.15, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.002) * 0.7]}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.55, 0.1, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      <mesh position={[0.2, -0.6, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 16]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </group>
  );
}

const MascotPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Meet the Mascot</h1>
      <p className="mb-6 text-lg text-muted-foreground max-w-xl text-center">This friendly astronaut waves and reacts to your mouse movement. You can replace it with your own 3D model for a more personal touch!</p>
      <div className="w-full max-w-2xl h-[500px] rounded-xl overflow-hidden border border-border/30 bg-card/80 shadow-lg">
        <Canvas camera={{ position: [0, 0.5, 3], fov: 60 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 2]} intensity={0.7} />
          <Float floatIntensity={0.2} speed={1.2}>
            <AstronautMascot />
          </Float>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
    </main>
  );
};

export default MascotPage;
