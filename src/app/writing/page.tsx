'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/utils/supabaseClient';

type Post = { slug: string; title: string; content: string; created_at: string; read_time?: string; tags?: string[] | string };

function tagsFor(post: Post) {
  if (Array.isArray(post.tags)) return post.tags;
  if (typeof post.tags === 'string') {
    try { return post.tags.startsWith('[') ? JSON.parse(post.tags) : post.tags.split(',').map((tag) => tag.trim()).filter(Boolean); } catch { return []; }
  }
  return [];
}

export default function WritingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    const loadPosts = async () => {
      try {
        const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        setPosts(data || []);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filtered = useMemo(() => posts.filter((post) => `${post.title} ${post.content} ${tagsFor(post).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);

  return <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 sm:py-28"><p className="label">Writing</p><h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">An engineering notebook.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Notes on backend engineering, cybersecurity, AI, distributed systems, and lessons learned from projects.</p><div className="mt-12 border-b border-border pb-3"><label htmlFor="writing-search" className="sr-only">Search writing</label><input id="writing-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground" /></div><div className="mt-4">{loading ? <p className="py-8 text-sm text-muted-foreground">Loading notes...</p> : filtered.length === 0 ? <p className="py-8 text-sm text-muted-foreground">No published notes yet.</p> : filtered.map((post) => <Link key={post.slug} href={`/writing/${encodeURIComponent(post.slug)}`} className="group block border-b border-border py-7"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"><h2 className="text-xl font-semibold group-hover:text-primary">{post.title}</h2><time className="font-mono text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time></div><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{post.content.replace(/[#*_`]/g, '').slice(0, 180)}...</p><div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">{tagsFor(post).map((tag) => <span key={tag}>{tag}</span>)}{post.read_time && <span>{post.read_time}</span>}</div></Link>)}</div></div>;
}