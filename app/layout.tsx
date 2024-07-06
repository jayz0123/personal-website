// layout.tsx
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import Providers from './Providers';
import { garamond } from '@/ui/fonts';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Jayz',
    default: 'Howie Jayz',
  },
  description: "Howie Jayz's Personal Website Built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${garamond.className} text-pretty antialiased `}>
        <Providers>
          <div className="flex flex-col items-center justify-between min-h-screen">
            <NavBar />
            <main className="flex w-10/12 max-w-screen-xl grow mt-16 mb-8 xl:mt-32">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
