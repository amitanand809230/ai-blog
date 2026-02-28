import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDir = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  metaDescription: string;
  readingTime: string;
  heroImage: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

function ensurePostsDir() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDir();
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        metaDescription: data.metaDescription || data.excerpt || '',
        readingTime: rt.text,
        heroImage: data.heroImage || getPollinationsUrl(data.title || slug),
        author: data.author || 'NeuralPulse AI',
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  ensurePostsDir();
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    metaDescription: data.metaDescription || data.excerpt || '',
    readingTime: rt.text,
    heroImage: data.heroImage || getPollinationsUrl(data.title || slug),
    author: data.author || 'NeuralPulse AI',
    content,
  };
}

export function getPollinationsUrl(title: string): string {
  const prompt = encodeURIComponent(
    `minimalist tech blog hero image about "${title}", dark background, neon green accents, futuristic, no text, abstract digital art`
  );
  return `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&nologo=true`;
}
