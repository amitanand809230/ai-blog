/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['image.pollinations.ai'],
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
};

module.exports = nextConfig;
