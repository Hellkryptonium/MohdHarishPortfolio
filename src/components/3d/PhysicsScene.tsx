'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// A component for physics-enabled floating objects
export const PhysicsObject = ({ 
  position = [0, 0, 0] as [number, number, number],
  size = [1, 1, 1] as [number, number, number],
  color = '#8C52FF',
  mass = 1,
  restitution = 0.5
}) => {
  const [active, setActive] = useState(false);
  
  // Spring animation for hover effect
  const { scale } = useSpring({
    scale: active ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  // Reference to the rigid body
  const rigidBodyRef = useRef<any>(null);
  
  // Apply a small random impulse every few seconds to keep things moving
  useEffect(() => {
    const interval = setInterval(() => {
      if (rigidBodyRef.current) {
        // Apply a small random impulse
        const impulse = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        );
        (rigidBodyRef.current as any).applyImpulse(impulse, true);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position as [number, number, number]}
      mass={mass}
      restitution={restitution}
      colliders="cuboid"
    >
      <animated.mesh
        scale={scale}
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={() => {
          if (rigidBodyRef.current) {
            const impulse = new THREE.Vector3(
              (Math.random() - 0.5) * 5,
              5,
              (Math.random() - 0.5) * 5
            );
            (rigidBodyRef.current as any).applyImpulse(impulse, true);
          }
        }}
      >
        <boxGeometry args={size as [number, number, number]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.7} 
          emissive={color} 
          emissiveIntensity={0.2} 
        />
      </animated.mesh>
    </RigidBody>
  );
};

// A component for a physics-enabled scene
export const PhysicsScene = ({ children }) => {
  return (
    <Physics gravity={[0, -2, 0]} debug={false}>
      {/* Invisible floor to catch falling objects */}
      <CuboidCollider 
        position={[0, -5, 0]} 
        args={[50, 0.5, 50]} 
        restitution={0.7} 
      />
      
      {/* Invisible walls to keep objects contained */}
      <CuboidCollider 
        position={[0, 0, -10]} 
        args={[50, 50, 0.5]} 
        restitution={0.7} 
      />
      <CuboidCollider 
        position={[0, 0, 10]} 
        args={[50, 50, 0.5]} 
        restitution={0.7} 
      />
      <CuboidCollider 
        position={[-10, 0, 0]} 
        args={[0.5, 50, 50]} 
        restitution={0.7} 
      />
      <CuboidCollider 
        position={[10, 0, 0]} 
        args={[0.5, 50, 50]} 
        restitution={0.7} 
      />
      
      {children}
    </Physics>
  );
};

// Export a collection of physics objects to use in the scene
export const PhysicsObjectField = ({ count = 10, area = 8 }) => {
  const colors = ['#8C52FF', '#FF6B6B', '#00F5D4'];
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <PhysicsObject 
          key={i}
          position={[
            (Math.random() - 0.5) * area,
            Math.random() * area + 2,
            (Math.random() - 0.5) * area
          ]}
          size={[
            Math.random() * 0.5 + 0.2,
            Math.random() * 0.5 + 0.2,
            Math.random() * 0.5 + 0.2
          ]}
          color={colors[Math.floor(Math.random() * colors.length)]}
          mass={Math.random() * 2 + 0.1}
          restitution={Math.random() * 0.3 + 0.4}
        />
      ))}
    </>
  );
};

export default PhysicsScene;
