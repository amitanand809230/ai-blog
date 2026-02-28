# ⚡ NeuralPulse — AI-Automated Tech Blog

> A fully automated blog that uses free AI tools to publish daily tech/AI news. Zero cost. Zero manual effort after setup.

![NeuralPulse Banner](https://image.pollinations.ai/prompt/NeuralPulse%20AI%20tech%20blog%20banner%2C%20dark%20neon%20green%20futuristic?width=1200&height=400&nologo=true)

## 🆓 Total Cost: $0/month

| Service | Free Tier | What it does |
|---|---|---|
| **Vercel** | ✅ Free forever | Hosts the Next.js blog |
| **Google Gemini API** | ✅ 1,500 req/day free | Writes blog posts |
| **Pollinations.ai** | ✅ Unlimited free | Generates hero images |
| **GitHub Actions** | ✅ 2,000 min/month free | Daily automation cron |
| **GitHub** | ✅ Free | Stores MDX files |

---

## 🚀 Setup Guide (30 minutes)

### Step 1 — Clone & Install

```bash
git clone https://github.com/yourusername/ai-blog.git
cd ai-blog
npm install
```

### Step 2 — Get Free Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → **Create API key**
3. Copy the key

### Step 3 — Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

### Step 4 — Test Locally

```bash
# Generate your first AI post
node automation/generatePost.js

# Start dev server
npm run dev
# Open http://localhost:3000
```

### Step 5 — Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.

### Step 6 — Configure GitHub Secrets

In your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New secret**

Add these secrets:

| Secret Name | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key |
| `SITE_URL` | Your Vercel URL (e.g. `https://neuralpulse.vercel.app`) |
| `TELEGRAM_BOT_TOKEN` | *(Optional)* Telegram bot token |
| `TELEGRAM_CHAT_ID` | *(Optional)* Your Telegram chat ID |

> `GITHUB_TOKEN` is automatically provided by GitHub Actions — no action needed!

### Step 7 — Enable GitHub Actions

The workflow in `.github/workflows/daily-post.yml` runs automatically every day at 9 AM UTC.

To trigger it manually: **GitHub** → **Actions** → **Daily AI Blog Post** → **Run workflow**

---

## 📁 Project Structure

```
ai-blog/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Homepage with featured post
│   ├── globals.css         # Styles (Syne + Space Mono fonts)
│   └── blog/
│       ├── page.tsx        # All posts listing
│       └── [slug]/
│           └── page.tsx    # Individual post page
├── components/
│   ├── Navbar.tsx          # Navigation
│   ├── FeaturedPost.tsx    # Hero post card
│   ├── PostCard.tsx        # Grid post card
│   └── Footer.tsx
├── lib/
│   └── posts.ts            # MDX file reader utility
├── content/
│   └── posts/              # ← AI-generated MDX files go here
├── automation/
│   └── generatePost.js     # Main pipeline script
└── .github/workflows/
    └── daily-post.yml      # GitHub Actions cron job
```

---

## 🔧 Customization

### Change blog name/theme
Edit `app/layout.tsx` and `components/Navbar.tsx`

### Change posting frequency
Edit `.github/workflows/daily-post.yml`:
```yaml
- cron: '0 9 * * *'     # Daily at 9am UTC
- cron: '0 9 * * 1,3,5' # Mon/Wed/Fri
- cron: '0 9 1 * *'     # Monthly
```

### Change AI writing style
Edit the prompt in `automation/generatePost.js` → `generateBlogPost()` function

### Add more news sources
Add RSS feed URLs to the `RSS_SOURCES` array in `automation/generatePost.js`

### Add Telegram notifications
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a bot, get the token
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to GitHub Secrets

---

## 📊 How the Automation Pipeline Works

```
GitHub Actions (9 AM daily)
         │
         ▼
Fetch RSS feeds (HN, TechCrunch, VentureBeat...)
         │
         ▼
Filter AI/tech topics
         │
         ▼
Gemini 1.5 Flash writes 1000-word article
         │
         ▼
Generate hero image URL (Pollinations.ai)
         │
         ▼
Save as content/posts/[slug].mdx
         │
         ▼
Commit to GitHub via API
         │
         ▼
Vercel auto-deploys (30 seconds)
         │
         ▼
📖 Post is live! (+ optional Telegram alert)
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Syne (display) + Space Mono (body)
- **Content**: MDX files in `/content/posts`
- **AI**: Google Gemini 1.5 Flash
- **Images**: Pollinations.ai
- **Automation**: GitHub Actions
- **Hosting**: Vercel

---

## 📄 License

MIT — do whatever you want with this!
