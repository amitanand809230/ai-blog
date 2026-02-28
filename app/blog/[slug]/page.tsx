import { getPost, getAllPosts, getPollinationsUrl } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const imageUrl = post.heroImage || getPollinationsUrl(post.title);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-accent font-mono text-sm mb-10 hover:gap-3 transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to feed
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5 fade-up fade-up-1">
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Title */}
      <h1
        className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6 fade-up fade-up-1"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-text-dim font-mono text-xs mb-8 pb-8 border-b border-border fade-up fade-up-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          {post.author}
        </span>
        <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
        <span>{post.readingTime}</span>
      </div>

      {/* Hero Image */}
      <div className="rounded-xl overflow-hidden border border-border mb-10 fade-up fade-up-2" style={{ aspectRatio: '1200/630' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Excerpt */}
      <p className="text-text-dim text-lg font-mono leading-relaxed mb-10 pl-4 border-l-2 border-accent fade-up fade-up-3">
        {post.excerpt}
      </p>

      {/* MDX Content */}
      <div className="prose prose-invert prose-lg max-w-none fade-up fade-up-4
        prose-headings:font-display prose-headings:tracking-tight
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-blockquote:border-accent prose-blockquote:text-text-dim
        prose-img:rounded-xl prose-img:border prose-img:border-border"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <MDXRemote source={post.content} />
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-border fade-up fade-up-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-dim font-mono text-xs tracking-widest uppercase mb-1">Written by</p>
            <p className="text-accent font-display font-bold">{post.author}</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 border border-accent/40 text-accent font-mono text-sm rounded hover:bg-accent hover:text-bg transition-all"
          >
            More Posts →
          </Link>
        </div>
      </div>

    </article>
  );
}
