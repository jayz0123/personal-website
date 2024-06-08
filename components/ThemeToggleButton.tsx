'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const userTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (theme: 'light' | 'dark') => {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    };

    if (userTheme) {
      setTheme(userTheme);
      if (userTheme === 'system') {
        applyTheme(systemPreference.matches ? 'dark' : 'light');
      } else {
        applyTheme(userTheme);
      }
    } else {
      applyTheme(systemPreference.matches ? 'dark' : 'light');
    }

    const handleSystemPreferenceChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    systemPreference.addEventListener('change', handleSystemPreferenceChange);

    return () => {
      systemPreference.removeEventListener('change', handleSystemPreferenceChange);
    };
  }, []);

  const handleChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.classList.toggle('dark', systemPreference.matches);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div className="group fixed flex flex-col items-center bottom-4 right-4 p-1 rounded-full bg-slate-800 text-slate-300">
      <button
        onClick={() => handleChange('light')}
        className={`p-2 rounded-full transition duration-500 ease-in-out ${
          theme === 'light' ? 'relative z-10 text-yellow-500' : 'absolute top-0 invisible group-hover:visible group-hover:relative'
        }`}
        aria-label="Light Mode"
      >
        <SunIcon className={`h-7 w-7 `} />
      </button>
      <button
        onClick={() => handleChange('dark')}
        className={`p-2 rounded-full transition duration-500 ease-in-out ${
          theme === 'dark' ? 'relative z-10 text-blue-800' : 'absolute top-0 invisible group-hover:visible group-hover:relative'
        }`}
        aria-label="Dark Mode"
      >
        <MoonIcon className={`h-7 w-7 `} />
      </button>
      <button
        onClick={() => handleChange('system')}
        className={`p-2 rounded-full transition duration-500 ease-in-out ${
          theme === 'system' ? 'relative z-10 text-green-600' : 'absolute top-0 invisible group-hover:visible group-hover:relative'
        }`}
        aria-label="System Mode"
      >
        <ComputerDesktopIcon className={`h-7 w-7`} />
      </button>
    </div>
  );
}
