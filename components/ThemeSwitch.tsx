"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const size = "28";

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <label className="btn btn-ghost btn-circle">
        <span className="loading loading-ring loading-2xl"></span>
      </label>
    );

  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        onClick={toggleTheme}
        type="checkbox"
        defaultChecked={resolvedTheme === "dark"}
      />

      {/* sun icon */}
      <SunIcon
        width={size}
        height={size}
        className="fill-yellow-400 swap-off"
      />

      {/* moon icon */}
      <MoonIcon width={size} height={size} className="fill-blue-700 swap-on" />
    </label>
  );
}
