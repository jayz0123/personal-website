// layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter } from '@/ui/fonts';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Jayz',
    default: 'Howie Jayz',
  },
  description: "Howie Jayz's Personal Website Built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${inter.className} transition duration-1000 ease-in-out antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="pt-16 flex-grow">
          {children}
        </main> 
        <Footer />
        <ThemeToggleButton />
      </body>
    </html>
  );
}
