import Link from 'next/link';
import { format } from 'date-fns';
import type { PostMeta } from '@/lib/posts';

interface Props {
  post: PostMeta;
  index: number;
}

export default function PostCard({ post, index }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div
        className="post-card h-full rounded-xl border border-border bg-surface overflow-hidden flex flex-col"
        style={{
          animationDelay: `${0.1 * index}s`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>

          <h3 className="font-display font-bold text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors flex-1"
              style={{ fontFamily: 'Syne, sans-serif' }}>
            {post.title}
          </h3>

          <p className="text-text-dim font-mono text-xs leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="text-xs font-mono text-muted">
              {format(new Date(post.date), 'MMM d, yyyy')}
            </div>
            <div className="text-xs font-mono text-muted">{post.readingTime}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
