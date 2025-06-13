'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';
import { supabase } from '@/utils/supabaseClient';
import { marked } from 'marked';

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
  // Decode URL-encoded slug to handle spaces
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('posts').select('*').eq('slug', decodedSlug).single();
      console.log('Fetching post:', decodedSlug, data, error);
      
      // Process the post data
      if (data) {
        // Extract tags using our utility function
        const tags = extractTags(data.tags);
        setPost({
          ...data,
          tags
        });
      } else {
        setPost(null);
      }
      
      setLoading(false);
    }
    fetchPost();
  }, [decodedSlug]);

  // Function to extract tags from various formats - identical to blog list page
  const extractTags = (input: any): string[] => {
    // Handle clean array format ["Test","Test","Test"]
    if (Array.isArray(input) && input.every(item => typeof item === 'string')) {
      return Array.from(new Set(input.map(tag => tag.trim())));
    }
    
    // Try parsing if it's a string that looks like an array
    if (typeof input === 'string' && input.trim().startsWith('[') && input.trim().endsWith(']')) {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
          return Array.from(new Set(parsed.map(tag => String(tag).trim())));
        }
      } catch (e) {
        // Silently fail and continue to next method
      }
    }
    
    // Return empty array for any other format
    return [];
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!post) return <div className="p-8 text-center">Post not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-accent mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to all posts
        </Link>
        
        <div className="flex items-center justify-between mb-2">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>
          {post.read_time && (
            <span className="ml-4 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
              {post.read_time}
            </span>
          )}
        </div>
        
        {/* Tags display */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center mb-8 text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked(post.content || '') }} />
      </div>
    </div>
  );
}
