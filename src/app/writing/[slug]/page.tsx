'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { supabase } from '@/utils/supabaseClient';

export default function WritingPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.from('posts').select('*').eq('slug', decodeURIComponent(params.slug)).single().then(({ data }) => { setPost(data); setLoading(false); }); }, [params.slug]);
  if (loading) return <div className="mx-auto max-w-3xl px-5 py-20 text-sm text-muted-foreground lg:px-8">Loading note...</div>;
  if (!post) return <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8"><p className="text-muted-foreground">Note not found.</p><Link href="/writing" className="mt-5 inline-block text-primary">Back to writing -&gt;</Link></div>;
  return <article className="mx-auto max-w-3xl px-5 py-20 lg:px-8 sm:py-28"><Link href="/writing" className="text-sm text-primary hover:text-foreground">&lt;- All writing</Link><p className="label mt-12">{post.read_time || 'Engineering note'}</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{post.title}</h1><p className="mt-5 text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p><div className="prose prose-neutral mt-12 max-w-none leading-8" dangerouslySetInnerHTML={{ __html: marked(post.content || '') }} /></article>;
}