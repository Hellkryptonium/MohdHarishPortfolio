'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';

// Simple 3D model for embedding
function CubeModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    const mesh = meshRef.current;
    // In React Three Fiber, we use the Three.js Object3D API 
    // instead of DOM event listeners
    mesh.userData.handlePointerOver = () => {
      document.body.style.cursor = 'pointer';
    };
    
    mesh.userData.handlePointerOut = () => {
      document.body.style.cursor = 'default';
    };
  }, []);
  
  return (
    <mesh 
      ref={meshRef} 
      rotation={[0, Math.PI / 4, 0]}
      onPointerOver={(e) => {
        if (meshRef.current?.userData.handlePointerOver) 
          meshRef.current.userData.handlePointerOver();
      }}
      onPointerOut={(e) => {
        if (meshRef.current?.userData.handlePointerOut) 
          meshRef.current.userData.handlePointerOut();
      }}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8C52FF" />
    </mesh>
  );
}

export default function BlogPostPage({ params }) {
  const { slug } = params;
  
  // Normally this would come from a CMS or file system
  const post = {
    title: 'Building 3D Websites with React Three Fiber',
    date: '2025-06-01',
    author: 'Mohd Harish',
    content: `
# Building 3D Websites with React Three Fiber

In this post, we'll explore how to create immersive 3D experiences on the web using React Three Fiber and Next.js.

## Getting Started

React Three Fiber (R3F) is a React renderer for Three.js, making it easier to build 3D graphics with a component-based approach.

## Interactive 3D Example

Below is an interactive 3D model that you can rotate and zoom:

## Code Example

Here's how to create a simple 3D scene with React Three Fiber:

\`\`\`jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8C52FF" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
\`\`\`

## Conclusion

3D web experiences open up new possibilities for engagement and interactivity in your projects.
    `,
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-accent mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to all posts
        </Link>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>
        
        <div className="flex items-center mb-8 text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <Card className="mb-8 p-0 overflow-hidden bg-card/80 backdrop-blur-sm">
          <div className="h-[300px] w-full">
            <Canvas>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <CubeModel />
              <OrbitControls 
                enableZoom={true}
                maxDistance={10}
                minDistance={3}
              />
            </Canvas>
          </div>
          <div className="p-4 text-center text-sm text-muted-foreground">
            Interactive 3D model - click and drag to rotate, scroll to zoom
          </div>
        </Card>
        
        <div className="prose prose-invert max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
            } else if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
            } else if (paragraph.startsWith('```')) {
              return (
                <pre key={idx} className="bg-black/30 p-4 rounded-md overflow-x-auto my-4">
                  <code className="text-sm text-green-400">{paragraph.split('\n').slice(1, -1).join('\n')}</code>
                </pre>
              );
            } else {
              return <p key={idx} className="mb-4">{paragraph}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
