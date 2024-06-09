"use client";

import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (localStorage.getItem("theme") !== null) {
      return localStorage.getItem("theme") as "light" | "dark" | "system";
    }
    return "system";
  });

  useEffect(() => {
    const userTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system";
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: "light" | "dark") => {
      document.documentElement.classList.toggle("dark", theme === "dark");
    };

    if (userTheme) {
      setTheme(userTheme);
      if (userTheme === "system") {
        applyTheme(systemPreference.matches ? "dark" : "light");
      } else {
        applyTheme(userTheme);
      }
    } else {
      applyTheme(systemPreference.matches ? "dark" : "light");
    }

    const handleSystemPreferenceChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    systemPreference.addEventListener("change", handleSystemPreferenceChange);

    return () => {
      systemPreference.removeEventListener(
        "change",
        handleSystemPreferenceChange
      );
    };
  }, []);

  const handleChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      document.documentElement.classList.toggle(
        "dark",
        systemPreference.matches
      );
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <div className="group fixed flex flex-col items-center bottom-3 right-3 p-1 rounded-full text-slate-400">
      <button
        onClick={() => handleChange("light")}
        className={`p-2 rounded-full transition duration-500 ease-in-out translate-y-double group-hover:translate-y-0 ${
          theme === "light"
            ? "text-yellow-500 "
            : "opacity-0 group-hover:opacity-100 "
        }`}
        aria-label="Light Mode"
      >
        <SunIcon className={`h-7 w-7 `} />
      </button>
      <button
        onClick={() => handleChange("dark")}
        className={`p-2 rounded-full transition duration-500 ease-in-out translate-y-full group-hover:translate-y-0 ${
          theme === "dark"
            ? "text-blue-500"
            : "opacity-0 group-hover:opacity-100"
        }`}
        aria-label="Dark Mode"
      >
        <MoonIcon className={`h-7 w-7 `} />
      </button>
      <button
        onClick={() => handleChange("system")}
        className={`p-2 rounded-full transition duration-500 ease-in-out ${
          theme === "system"
            ? "text-emerald-400"
            : "opacity-0 group-hover:opacity-100"
        }`}
        aria-label="System Mode"
      >
        <ComputerDesktopIcon className={`h-7 w-7`} />
      </button>
    </div>
  );
}
