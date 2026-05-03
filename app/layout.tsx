import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a1a'
};

export const metadata: Metadata = {
  title: 'FROGULA KEYHOUSE | Sovereign Core',
  description: 'An experimental dashboard for visualizing multi-agent intelligence. Part Archive, Part Playground, Part War Room.',
  keywords: ['AI', 'multi-agent', 'dashboard', 'FROGULA', 'intelligence', 'automation'],
  authors: [{ name: 'FROGULA Corp' }],
  openGraph: {
    title: 'FROGULA KEYHOUSE | Sovereign Core',
    description: 'An experimental dashboard for visualizing multi-agent intelligence.',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FROGULA KEYHOUSE',
    description: 'An experimental dashboard for visualizing multi-agent intelligence.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-slate-950">
        {children}
      </body>
    </html>
  );
}
