#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const Parser = require('rss-parser');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'yourusername/ai-blog';
const SITE_URL = process.env.SITE_URL || 'https://yoursite.vercel.app';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const RSS_SOURCES = [
  'https://hnrss.org/frontpage',
  'https://techcrunch.com/feed/',
  'https://www.artificialintelligence-news.com/feed/',
  'https://feeds.feedburner.com/venturebeat/SZYF',
  'https://www.technologyreview.com/feed/',
];

// ─────────────────────────────────────────────
// 1. FETCH TOPICS
// ─────────────────────────────────────────────
async function fetchTrendingTopics() {
  console.log('📡 Fetching trending topics from RSS feeds...');
  const parser = new Parser({ timeout: 10000, headers: { 'User-Agent': 'NeuralPulse-Bot/1.0' } });
  const allItems = [];

  for (const url of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(url);
      const items = feed.items.slice(0, 5).map(item => ({
        title: item.title || '',
        summary: (item.contentSnippet || item.content || '').slice(0, 150),
        source: feed.title || url,
      }));
      allItems.push(...items);
      console.log(`  ✓ ${feed.title}: ${items.length} items`);
    } catch (err) {
      console.warn(`  ✗ Failed to fetch ${url}: ${err.message}`);
    }
  }

  const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'openai',
    'anthropic', 'deepmind', 'neural', 'model', 'chatbot', 'automation', 'robot',
    'tech', 'startup', 'future', 'data', 'cloud', 'quantum'];

  const filtered = allItems.filter(item =>
    aiKeywords.some(kw =>
      item.title.toLowerCase().includes(kw) || item.summary.toLowerCase().includes(kw)
    )
  );

  console.log(`📰 Found ${filtered.length} AI-related articles`);
  return filtered.slice(0, 5);
}

// ─────────────────────────────────────────────
// 2. GENERATE POST — asks for fields separately
//    to avoid JSON parsing issues with long content
// ─────────────────────────────────────────────
async function generateBlogPost(topics) {
  console.log('🤖 Generating blog post with Groq (Llama 3.3 70B)...');

  if (!GROQ_API_KEY) {
    throw new Error('Missing GROQ_API_KEY. Get yours FREE at console.groq.com');
  }

  const groq = new OpenAI({
    apiKey: GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  const topicsText = topics.map((t, i) =>
    `${i + 1}. "${t.title}" (${t.source})`
  ).join('\n');

  // ── Step A: get metadata (small, safe JSON) ──
  const metaPrompt = `You are a tech journalist for "NeuralPulse" AI blog.

Topics today:
${topicsText}

Pick the best topic. Return ONLY this JSON (no markdown, no backticks):
{"title":"SEO title under 60 chars","slug":"url-slug-with-hyphens","excerpt":"2-sentence hook under 160 chars","metaDescription":"SEO description under 155 chars","tags":["Tag1","Tag2","Tag3"]}`;

  const metaResult = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: metaPrompt }],
    max_tokens: 300,
    temperature: 0.7,
  });

  const metaRaw = metaResult.choices[0].message.content.trim()
    .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  const meta = JSON.parse(metaRaw);

  // ── Step B: get article body (plain text, no JSON) ──
  const contentPrompt = `Write a 900-1100 word blog post for "NeuralPulse" about: "${meta.title}"

Rules:
- Use ## for section headings
- Use **bold** for key terms
- Write in clear, insightful journalism style
- No hype, no fluff
- Return ONLY the article body markdown, nothing else`;

  const contentResult = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: contentPrompt }],
    max_tokens: 2000,
    temperature: 0.7,
  });

  const content = contentResult.choices[0].message.content.trim();

  // ── Assemble post ──
  const post = {
    ...meta,
    content,
    slug: meta.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
    date: new Date().toISOString(),
  };

  const imagePrompt = encodeURIComponent(
    `minimalist tech blog hero image about "${post.title}", dark background, neon green accent lights, futuristic digital art, no text, abstract`
  );
  post.heroImage = `https://image.pollinations.ai/prompt/${imagePrompt}?width=1200&height=630&nologo=true&seed=${Date.now()}`;

  console.log(`✅ Generated: "${post.title}"`);
  return post;
}

// ─────────────────────────────────────────────
// 3. BUILD MDX
// ─────────────────────────────────────────────
function buildMDX(post) {
  return `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
metaDescription: "${(post.metaDescription || post.excerpt).replace(/"/g, '\\"')}"
tags: [${post.tags.map(t => `"${t}"`).join(', ')}]
heroImage: "${post.heroImage}"
author: "NeuralPulse AI"
---

${post.content}
`;
}

// ─────────────────────────────────────────────
// 4. SAVE LOCALLY
// ─────────────────────────────────────────────
async function saveLocally(post) {
  const postsDir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
  const filePath = path.join(postsDir, `${post.slug}.mdx`);
  fs.writeFileSync(filePath, buildMDX(post), 'utf-8');
  console.log(`💾 Saved: ${filePath}`);
}

// ─────────────────────────────────────────────
// 5. PUSH TO GITHUB
// ─────────────────────────────────────────────
async function pushToGitHub(post) {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️  No GITHUB_TOKEN — file saved locally only.');
    return;
  }
  const filePath = `content/posts/${post.slug}.mdx`;
  const content = Buffer.from(buildMDX(post)).toString('base64');
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  let sha;
  try {
    const check = await fetch(apiUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } });
    if (check.ok) { const d = await check.json(); sha = d.sha; }
  } catch {}

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `🤖 AI post: ${post.title}`, content, ...(sha ? { sha } : {}) }),
  });

  if (!res.ok) throw new Error(`GitHub push failed: ${await res.text()}`);
  console.log(`🚀 Live at: ${SITE_URL}/blog/${post.slug}`);
}

// ─────────────────────────────────────────────
// 6. TELEGRAM (optional)
// ─────────────────────────────────────────────
async function sendTelegramNotification(post) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: `📰 *New Post!*\n\n*${post.title}*\n\n${post.excerpt}\n\n🔗 ${SITE_URL}/blog/${post.slug}`,
      parse_mode: 'Markdown',
    }),
  });
  console.log('📨 Telegram notification sent!');
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log('\n═══════════════════════════════════════');
  console.log('  NeuralPulse — AI Post Generator');
  console.log(`  ${new Date().toLocaleString()}`);
  console.log('═══════════════════════════════════════\n');

  try {
    const topics = await fetchTrendingTopics();
    if (topics.length === 0) throw new Error('No topics found. Check network connectivity.');

    const post = await generateBlogPost(topics);
    await saveLocally(post);
    await pushToGitHub(post);
    await sendTelegramNotification(post);

    console.log('\n✅ Pipeline complete!');
    console.log(`   Title: ${post.title}`);
    console.log(`   Slug:  ${post.slug}`);
    console.log(`   Tags:  ${post.tags.join(', ')}\n`);

  } catch (err) {
    console.error('\n❌ Pipeline failed:', err.message);
    process.exit(1);
  }
}

main();
