'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@/components/ui/Icons';

export default function ThemeSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className="loading loading-ball loading-xl"></span>;
  }
  return (
    <label className="swap swap-rotate" aria-label="dark mode switch">
      {/* this hidden checkbox controls the state */}
      <input
        onClick={toggleTheme}
        type="checkbox"
        defaultChecked={resolvedTheme === 'dark'}
      />

      {/* sun icon */}
      <SunIcon />

      {/* moon icon */}
      <MoonIcon />
    </label>
  );
}
