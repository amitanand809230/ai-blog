import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 fade-up fade-up-1">
        <h1 className="font-display text-4xl font-extrabold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          All Posts
        </h1>
        <p className="text-text-dim font-mono text-sm">{posts.length} articles published by AI</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up fade-up-2">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
