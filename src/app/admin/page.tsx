// Admin blog editor page for Mohd Harish
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';

export default function AdminBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // comma-separated
  const [readTime, setReadTime] = useState('5 min'); // default read time
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tab, setTab] = useState<'write' | 'manage'>('write');
  const [search, setSearch] = useState('');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [editReadTime, setEditReadTime] = useState('5 min');
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editManageLoading, setEditManageLoading] = useState(false);

  // Only allow your email
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Fetch all posts for manage tab
  useEffect(() => {
    if (tab !== 'manage') return;
    setManageLoading(true);
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setAllPosts(data || []);
      setManageLoading(false);
    });
  }, [tab, success]);

  // Edit handler for manage tab
  const openEdit = (post: any) => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditSlug(post.slug);
    setEditContent(post.content);
    setEditReadTime(post.read_time);
    let tagArr = [];
    if (Array.isArray(post.tags)) tagArr = post.tags;
    else if (typeof post.tags === 'string') tagArr = post.tags.split(',').map(t => t.trim()).filter(Boolean);
    setEditTags(tagArr.join(','));
    setEditError('');
    setEditSuccess('');
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditManageLoading(true);
    setEditError('');
    setEditSuccess('');
    const tagArr = editTags.split(',').map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from('posts').update({
      title: editTitle,
      slug: editSlug,
      content: editContent,
      tags: tagArr,
      read_time: editReadTime
    }).eq('id', editId);
    setEditManageLoading(false);
    if (error) setEditError(error.message);
    else {
      setEditSuccess('Updated!');
      setEditId(null);
      setTab('manage');
      setSuccess('Blog updated!');
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    await supabase.from('posts').delete().eq('id', id);
    setAllPosts(posts => posts.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean);
    // Insert post into Supabase
    const { error } = await supabase.from('posts').insert([
      {
        title,
        slug,
        content,
        tags: tagArr,
        author: user!.email,
        read_time: readTime
      },
    ]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Blog post published!');
      setTitle('');
      setSlug('');
      setContent('');
      setTags('');
      setReadTime('5 min');
      setTimeout(() => router.push('/blog'), 1200);
    }
  };

  // Render access denied after all hooks
  if (!user || user.email !== ADMIN_EMAIL) {
    return <div className="p-8 text-center text-lg">Access denied.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      {/* Admin sub-navbar */}
      <div className="flex gap-4 mb-8 border-b border-border/30 pb-2">
        <button onClick={() => setTab('write')} className={`px-4 py-2 rounded-t-lg font-semibold ${tab === 'write' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-accent'}`}>Write Blog</button>
        <button onClick={() => setTab('manage')} className={`px-4 py-2 rounded-t-lg font-semibold ${tab === 'manage' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-accent'}`}>Manage Blogs</button>
      </div>
      {/* Write tab */}
      {tab === 'write' && (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card/90 p-6 rounded-xl shadow-xl border border-border/40">
            <input
              className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              placeholder="Slug (e.g. my-first-post)"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              required
            />
            <input
              className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              placeholder="Tags (comma separated, e.g. react,3d,portfolio)"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
            <div>
              <label className="block mb-1 font-semibold text-foreground">Content (Markdown supported)</label>
              <textarea
                className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg min-h-[180px] w-full font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="Write your blog post in Markdown..."
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-foreground">Read Time</label>
              <input
                className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="e.g. 5 min"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-lg py-2 px-4 mt-2 shadow hover:shadow-md transition"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}
          </form>
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-2">Live Preview</h2>
            <div className="prose prose-invert max-w-none bg-muted/40 p-4 rounded-lg border border-border/20" dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </div>
        </>
      )}
      {/* Manage tab */}
      {tab === 'manage' && (
        <div>
          <input
            className="border border-border/30 bg-background/80 text-foreground p-2 rounded-lg mb-4 w-full"
            placeholder="Search by title, slug, or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {manageLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              {allPosts.filter(post => {
                let tagArr = [];
                if (Array.isArray(post.tags)) tagArr = post.tags;
                else if (typeof post.tags === 'string') tagArr = post.tags.split(',').map(t => t.trim()).filter(Boolean);
                return (
                  post.title.toLowerCase().includes(search.toLowerCase()) ||
                  post.slug.toLowerCase().includes(search.toLowerCase()) ||
                  tagArr.join(',').toLowerCase().includes(search.toLowerCase())
                );
              }).map(post => {
                let tagArr = [];
                if (Array.isArray(post.tags)) tagArr = post.tags;
                else if (typeof post.tags === 'string') tagArr = post.tags.split(',').map(t => t.trim()).filter(Boolean);
                const previewContent = (post.content || '').slice(0, 400);
                return (
                  <div key={post.id} className="bg-card/80 border border-border/20 rounded-lg p-4 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div>
                        <span className="font-bold text-lg text-primary">{post.title}</span>
                        <span className="ml-2 text-xs text-muted-foreground">/{post.slug}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(post)} className="btn btn-primary btn-sm">Edit</button>
                        <button onClick={() => handleDelete(post.id)} className="btn btn-destructive btn-sm">Delete</button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{tagArr.join(', ')}</div>
                    <div className="prose prose-invert max-w-none mt-2" dangerouslySetInnerHTML={{ __html: marked(previewContent) + ((post.content || '').length > 400 ? '...' : '') }} />
                  </div>
                );
              })}
              {allPosts.length === 0 && <div className="p-4 text-center">No blogs found.</div>}
            </div>
          )}
          {/* Edit modal for manage tab */}
          {editId && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-card p-8 rounded-xl shadow-xl w-full max-w-lg border border-border/30">
                <h2 className="text-xl font-bold mb-4">Edit Blog Post</h2>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                  <input
                    className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    required
                  />
                  <input
                    className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg"
                    value={editSlug}
                    onChange={e => setEditSlug(e.target.value)}
                    required
                  />
                  <input
                    className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg"
                    value={editTags}
                    onChange={e => setEditTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                  />
                  <textarea
                    className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg min-h-[120px] font-mono"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    required
                  />
                  <div>
                    <label className="block mb-1 font-semibold text-foreground">Read Time</label>
                    <input
                      className="border border-border/30 bg-background/80 text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      placeholder="e.g. 5 min"
                      value={editReadTime}
                      onChange={e => setEditReadTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={editManageLoading}>{editManageLoading ? 'Saving...' : 'Save'}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                  {editError && <div className="text-red-500">{editError}</div>}
                  {editSuccess && <div className="text-green-600">{editSuccess}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
