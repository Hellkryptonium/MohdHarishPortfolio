'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
}

// This would normally come from a CMS or file system
const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'building-3d-websites-with-r3f',
    title: 'Building 3D Websites with React Three Fiber',
    excerpt: 'Learn how to create immersive 3D experiences on the web using React Three Fiber and Next.js.',
    date: '2025-06-01',
    readTime: '8 min read',
    tags: ['3D', 'React', 'Three.js'],
    thumbnail: '/assets/images/placeholders/project-alpha-placeholder.png',
  },
  {
    slug: 'cosmic-shader-effects',
    title: 'Creating Cosmic Shader Effects with GLSL',
    excerpt: 'Deep dive into custom shader effects for creating cosmic backgrounds and particle systems.',
    date: '2025-05-15',
    readTime: '12 min read',
    tags: ['GLSL', 'Shaders', 'WebGL'],
    thumbnail: '/assets/images/placeholders/project-beta-placeholder.png',
  },
  {
    slug: 'portfolio-design-patterns',
    title: 'Modern Portfolio Design Patterns for Developers',
    excerpt: 'Explore design patterns and best practices for creating standout developer portfolios.',
    date: '2025-04-22',
    readTime: '6 min read',
    tags: ['Design', 'UI/UX', 'Portfolio'],
    thumbnail: '/assets/images/placeholders/project-gamma-placeholder.png',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>
        <motion.p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Thoughts on web development, 3D graphics, and creative coding
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm hover:bg-card/90 border-border/50 overflow-hidden">
                  {post.thumbnail && (
                    <div className="h-48 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${post.thumbnail})` }}
                      />
                    </div>
                  )}
                  <CardHeader className="p-4 pb-2">
                    <h2 className="text-xl font-bold text-primary">{post.title}</h2>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-foreground/80">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
