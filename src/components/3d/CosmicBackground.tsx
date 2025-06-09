'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader for creating a cosmic background with stars
const CosmicShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    mousePosition: new THREE.Vector2(),
    colorA: new THREE.Color('#8C52FF'), // Electric Violet
    colorB: new THREE.Color('#0D0D0D'), // Jet Black
    colorC: new THREE.Color('#FF6B6B'), // Coral Red
  },
  // Vertex shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mousePosition;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    varying vec2 vUv;
    
    // Star field noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      // Normalized coordinates
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      
      // Create a cosmic gradient background
      float dist = length(uv - center);
      vec3 color = mix(colorA, colorB, smoothstep(0.0, 0.8, dist));
      
      // Add subtle radial pulse
      float pulse = sin(time * 0.5) * 0.1 + 0.9;
      color = mix(color, colorC, smoothstep(pulse - 0.1, pulse, dist) * 0.2);
      
      // Add stars
      for (int i = 0; i < 3; i++) {
        float size = (float(i) + 1.0) * 0.01;
        float sparkle = sin(time * (0.5 + float(i) * 0.2)) * 0.5 + 0.5;
        
        // Star field offset
        vec2 gridOffset = vec2(float(i) * 0.1, float(i) * 0.2);
        vec2 grid = fract((uv + gridOffset) * (20.0 + float(i) * 10.0));
        
        // Random stars
        float star = step(0.95 + (float(i) * 0.01), noise(floor((uv + gridOffset) * (20.0 + float(i) * 10.0))));
        color += star * sparkle * vec3(0.9, 0.9, 1.0) * size;
      }
      
      // Interactive effect - subtle glow near mouse position
      float mouseEffect = smoothstep(0.3, 0.0, length(uv - mousePosition));
      color = mix(color, colorA, mouseEffect * 0.3);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend Three.js with our custom shader material
extend({ CosmicShaderMaterial });

// Fix: Extend JSX for custom shader material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      cosmicShaderMaterial: any;
    }
  }
}

const CosmicBackground = ({ mousePosition = [0.5, 0.5], colorA = '#8C52FF', colorB = '#0D0D0D', colorC = '#FF6B6B' }) => {
  // Fix: Type assertion for shaderRef
  const shaderRef = useRef<any>(null);
  
  // Update shader uniforms on each frame
  useFrame(({ clock, size }) => {
    if (shaderRef.current) {
      shaderRef.current.time = clock.getElapsedTime();
      shaderRef.current.resolution.set(size.width, size.height);
      shaderRef.current.mousePosition.set(mousePosition[0], mousePosition[1]);
      // Animate colors
      shaderRef.current.colorA.set(colorA);
      shaderRef.current.colorB.set(colorB);
      shaderRef.current.colorC.set(colorC);
    }
  });

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <cosmicShaderMaterial ref={shaderRef} />
    </mesh>
  );
};

export default CosmicBackground;
