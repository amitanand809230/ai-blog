'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded border border-accent/40 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" fill="#00f5a0" />
                <circle cx="7" cy="7" r="6" stroke="#00f5a0" strokeWidth="1" opacity="0.4" />
                <circle cx="7" cy="7" r="9" stroke="#00f5a0" strokeWidth="0.5" opacity="0.15" />
              </svg>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Neural<span className="text-accent">Pulse</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-text-dim hover:text-accent font-mono text-sm transition-colors">Home</Link>
            <Link href="/blog" className="text-text-dim hover:text-accent font-mono text-sm transition-colors">All Posts</Link>
            <a
              href="https://github.com/yourusername/ai-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 border border-accent/30 rounded text-accent font-mono text-xs hover:bg-accent/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="sm:hidden text-text-dim" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden py-4 border-t border-border flex flex-col gap-4">
            <Link href="/" className="text-text-dim hover:text-accent font-mono text-sm" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/blog" className="text-text-dim hover:text-accent font-mono text-sm" onClick={() => setMenuOpen(false)}>All Posts</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
