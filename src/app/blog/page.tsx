'use client';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { supabase } from '@/utils/supabaseClient';
import { marked } from 'marked';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
  content: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (data) {
        setPosts(
          data.map((post: any) => {
            // Simple tag extraction function
            let tags: string[] = [];
            
            // Function to extract tags from various formats
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
            
            // Extract tags
            tags = extractTags(post.tags);
            
            return {
              slug: post.slug,
              title: post.title,
              excerpt: post.content.slice(0, 120) + '...',
              date: post.created_at,
              readTime: post.read_time || 'Unknown',
              tags,
              thumbnail: post.thumbnail,
              content: post.content,
            };
          })
        );
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const searchLower = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [posts, searchQuery]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

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
        
        {/* Search Box */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchQuery && filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground mt-2">
              No posts found. Try a different search term.
            </p>
          ) : searchQuery ? (
            <p className="text-center text-muted-foreground mt-2">
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          ) : null}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? filteredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="block h-full">
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
                    <div className="prose prose-invert max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: marked(post.content.slice(0, 120) + '...') }} />
                  </CardContent>
                  <CardFooter className="p-4 pt-2 flex flex-wrap gap-2">
                    {Array.isArray(post.tags) ? post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    )) : null}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">No posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
