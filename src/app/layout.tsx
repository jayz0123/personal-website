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
    template: '%s',
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
      url: 'https://resizer.howiejayz.com/opengraph-image.png?format=auto&quality=75&width=640',
      width: 768,
      height: 403,
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
          <div className="flex flex-col items-center justify-between min-h-[100dvh]">
            <NavBar />
            <main className="flex justify-center items-center min-w-full max-w-screen-xl grow my-8 px-8 sm:px-16 xl:px-32 m-auto">
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
