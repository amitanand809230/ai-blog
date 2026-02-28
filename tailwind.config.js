/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        bg: '#080b12',
        surface: '#0e1420',
        border: '#1a2236',
        accent: '#00f5a0',
        'accent-dim': '#00c87a',
        muted: '#4a5568',
        text: '#e2e8f0',
        'text-dim': '#718096',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e2e8f0',
            a: { color: '#00f5a0' },
            h1: { color: '#fff' },
            h2: { color: '#fff' },
            h3: { color: '#fff' },
            code: { color: '#00f5a0', background: '#0e1420' },
            blockquote: { borderLeftColor: '#00f5a0', color: '#a0aec0' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
