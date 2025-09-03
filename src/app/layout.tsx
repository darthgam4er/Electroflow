import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import ConditionalLayout from '@/components/ConditionalLayout';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Electroplanet - High-Tech & Electroménager',
  description: 'Votre boutique unique pour les dernières technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://placehold.co" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://placehold.co" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
            rel="stylesheet" 
          />
        </noscript>
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen bg-background', inter.variable)}>
        <CartProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster />
          <PerformanceMonitor />
        </CartProvider>
      </body>
    </html>
  );
}
