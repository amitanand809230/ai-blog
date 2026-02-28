export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-accent/40 flex items-center justify-center bg-accent/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" fill="#00f5a0" />
                <circle cx="7" cy="7" r="6" stroke="#00f5a0" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
            <span className="font-display font-bold text-white text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              Neural<span className="text-accent">Pulse</span>
            </span>
          </div>
          <p className="text-text-dim font-mono text-xs text-center">
            Fully automated by AI · Built with Next.js + Gemini · Free forever
          </p>
          <p className="text-muted font-mono text-xs">
            © {new Date().getFullYear()} NeuralPulse
          </p>
        </div>
      </div>
    </footer>
  );
}
