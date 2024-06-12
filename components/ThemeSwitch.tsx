"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ThemeSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="group fixed flex flex-col items-center bottom-3 right-3 p-1 rounded-full text-slate-400">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition duration-500 ease-in-out lg:translate-y-double lg:group-hover:translate-y-0 ${
          theme === "light"
            ? "text-yellow-500 "
            : "lg:opacity-0 group-hover:opacity-100"
        }`}
        aria-label="Light Mode"
      >
        <SunIcon className={`h-7 w-7`} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition duration-500 ease-in-out lg:translate-y-full lg:group-hover:translate-y-0 ${
          theme === "dark"
            ? "text-blue-500"
            : "lg:opacity-0 group-hover:opacity-100"
        }`}
        aria-label="Dark Mode"
      >
        <MoonIcon className={`h-7 w-7`} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition duration-500 ease-in-out ${
          theme === "system"
            ? "text-emerald-400"
            : "lg:opacity-0 group-hover:opacity-100"
        }`}
        aria-label="System Mode"
      >
        <ComputerDesktopIcon className={`h-7 w-7`} />
      </button>
    </div>
  );
}
