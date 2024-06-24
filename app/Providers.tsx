import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
