import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import FeaturedPost from '@/components/FeaturedPost';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NeuralPulse — AI & Tech News',
};

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero Header */}
      <div className="text-center mb-20 fade-up fade-up-1">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-accent text-xs font-mono tracking-widest uppercase">AI-Powered Daily Tech News</span>
        </div>
        <h1
          className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-4 glow-text cursor"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          NeuralPulse
        </h1>
        <p className="text-text-dim text-lg max-w-xl mx-auto font-mono">
          Automated AI insights on machine learning, LLMs, and the future of tech.
          <br />
          <span className="text-accent/60">Published daily. Powered by Gemini.</span>
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-12 mb-16 fade-up fade-up-2">
        {[
          { label: 'Posts Published', value: posts.length.toString().padStart(3, '0') },
          { label: 'Updated', value: 'Daily' },
          { label: 'Human Editors', value: '000' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-3xl font-bold text-accent">{stat.value}</div>
            <div className="text-text-dim text-xs font-mono tracking-widest uppercase mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Post */}
      {featured && (
        <div className="mb-16 fade-up fade-up-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-accent font-mono text-xs tracking-widest uppercase">Featured</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Post Grid */}
      {rest.length > 0 && (
        <div className="fade-up fade-up-3">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-accent font-mono text-xs tracking-widest uppercase">Latest Posts</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-24 fade-up fade-up-3">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="font-display text-2xl text-white mb-2">No posts yet</h2>
          <p className="text-text-dim font-mono text-sm mb-6">The AI will publish its first post soon.</p>
          <code className="bg-surface border border-border px-4 py-2 rounded text-accent text-sm font-mono">
            npm run generate-post
          </code>
        </div>
      )}

    </div>
  );
}
