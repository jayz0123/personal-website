import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { LusitanaFont } from '@/styles/fonts';
import '@/styles/globals.css';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Jayz',
    default: 'Howie Jayz',
  },
  authors: [
    {
      url: 'https://howiejayz.com',
      name: 'Howie Jayz',
    },
  ],
  generator: 'nextjs, react',
  description:
    "I'm a software engineer who loves to build things. I'm passionate about machine learning, photography, and hiking.",
  openGraph: {
    images: {
      url: 'https://api.howiejayz.com/dio.png?format=auto&quality=75&width=640',
      width: 640,
      alt: 'Howie Jayz',
    },
    emails: ['howiejayzh@gmail.com'],
    phoneNumbers: ['+447398126363'],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${LusitanaFont.className} text-pretty antialiased`}>
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
