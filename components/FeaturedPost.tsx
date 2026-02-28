import Link from 'next/link';
import { format } from 'date-fns';
import type { PostMeta } from '@/lib/posts';

export default function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative rounded-2xl border border-border overflow-hidden post-card bg-surface"
           style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>

        {/* Image */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-accent text-bg text-xs font-mono font-bold rounded tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bg"></span>
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-accent transition-colors"
              style={{ fontFamily: 'Syne, sans-serif' }}>
            {post.title}
          </h2>
          <p className="text-text-dim font-mono text-sm leading-relaxed mb-6 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-mono text-muted">
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <span className="text-accent font-mono text-xs group-hover:gap-2 flex items-center gap-1 transition-all">
              Read more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
