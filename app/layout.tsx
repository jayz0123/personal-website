// layout.tsx
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { garamond } from '@/ui/fonts';
import Theme from '@/app/Theme';
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${garamond.className} bg-base-100 text-base-content transition duration-200 ease-in-out text-pretty antialiased `}
      >
        <Theme>
          <div className="flex flex-col items-center justify-between min-h-screen">
            <div className="sticky top-0 z-30 flex h-16 w-full items-center backdrop-blur">
              <NavBar />
            </div>
            <main className="flex w-10/12 grow">{children}</main>
            <Footer />
          </div>
        </Theme>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
