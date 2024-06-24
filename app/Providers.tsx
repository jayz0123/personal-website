'use client';

import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
