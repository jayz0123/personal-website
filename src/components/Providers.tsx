'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

import { NextUIProvider } from '@nextui-org/system';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <ParallaxProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ParallaxProvider>
    </ThemeProvider>
  );
}
