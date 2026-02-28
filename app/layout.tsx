import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'NeuralPulse — AI & Tech News',
    template: '%s | NeuralPulse',
  },
  description: 'Daily AI-generated insights on artificial intelligence, machine learning, and cutting-edge technology.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NeuralPulse',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@neuralpulse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
