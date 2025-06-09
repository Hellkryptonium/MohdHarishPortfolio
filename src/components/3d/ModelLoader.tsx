'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Props interface for the ModelLoader component
interface ModelLoaderProps {
  path: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
  animationIndex?: number;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({
  path,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animate = false,
  animationIndex = 0,
  hoverEffect = false,
  onClick,
}) => {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Load the 3D model
  const { scene, animations } = useGLTF(path);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Clone the scene to avoid sharing materials between models
    const clonedScene = scene.clone();
    
    // If the model has animations and we want to animate it
    if (animate && names.length > 0) {
      const anim = names[animationIndex % names.length];
      const action = actions[anim];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }
    
    // Set loaded state after scene is processed
    setLoaded(true);
    
    return () => {
      // Clean up animations
      if (animate && names.length > 0) {
        const anim = names[animationIndex % names.length];
        const action = actions[anim];
        if (action) {
          action.fadeOut(0.5);
        }
      }
    };
  }, [animate, animationIndex, actions, names, scene]);

  // Animation and hover effect
  useFrame((state) => {
    if (!group.current) return;
    
    // Simple rotation animation if no animations from the model
    if (animate && (!names.length || !actions[names[animationIndex % names.length]])) {
      group.current.rotation.y += 0.005;
    }
    
    // Hover effect - scale up slightly when hovered
    if (hoverEffect && hovered) {
      group.current.scale.lerp(
        new THREE.Vector3(
          typeof scale === 'number' ? scale * 1.1 : scale[0] * 1.1,
          typeof scale === 'number' ? scale * 1.1 : scale[1] * 1.1,
          typeof scale === 'number' ? scale * 1.1 : scale[2] * 1.1
        ),
        0.1
      );
    } else {
      group.current.scale.lerp(
        new THREE.Vector3(
          typeof scale === 'number' ? scale : scale[0],
          typeof scale === 'number' ? scale : scale[1],
          typeof scale === 'number' ? scale : scale[2]
        ),
        0.1
      );
    }
  });

  // Set up scale as a Vector3
  const scaleVector = typeof scale === 'number' 
    ? [scale, scale, scale] as [number, number, number]
    : scale as [number, number, number];

  return (
    <group 
      ref={group} 
      position={position} 
      rotation={rotation}
      scale={scaleVector}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {loaded && <primitive object={scene} />}
    </group>
  );
};

export default ModelLoader;

// Preload the model to improve performance
useGLTF.preload('/assets/models/placeholder-model.glb');
