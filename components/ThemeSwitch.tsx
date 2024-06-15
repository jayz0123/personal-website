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
    // <div className="group fixed bottom-0 right-0 flex-auto">
    //   <div tabIndex={0} className="collapse flex flex-col-reverse">
    //     <div className="collapse-title p-0 flex flex-col items-center w-[60px]">
    //       {/* {theme === "light" ? (
    //         <SunIcon className={`h-7 w-7`} />
    //       ) : theme === "dark" ? (
    //         <MoonIcon className={`h-7 w-7`} />
    //       ) : (
    //         <ComputerDesktopIcon className={`h-7 w-7`} />
    //       )} */}
    //     </div>
    //     <div className="collapse-content flex flex-col items-center p-0">
    //       <SunIcon onClick={() => setTheme("light")} className={`h-7 w-7`} />
    //       <MoonIcon onClick={() => setTheme("dark")} className={`h-7 w-7`} />
    //       <ComputerDesktopIcon
    //         onClick={() => setTheme("system")}
    //         className={`h-7 w-7`}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="group fixed bottom-2 right-1 m-0">
      <div className="flex flex-col-reverse items-center text-slate-400 h-0">
        <button
          onClick={() => setTheme("system")}
          className={`p-1 transition duration-500 ease-in-out ${
            theme === "system"
              ? "text-emerald-400 z-10"
              : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="System Mode"
        >
          <ComputerDesktopIcon className={`h-7 w-7`} />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-1 transition duration-500 ease-in-out translate-y-full group-hover:translate-y-0 ${
            theme === "dark"
              ? "text-blue-500 z-10"
              : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Dark Mode"
        >
          <MoonIcon className={`h-7 w-7`} />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`p-1 transition duration-500 ease-in-out translate-y-double group-hover:translate-y-0 ${
            theme === "light"
              ? "text-yellow-500 z-10"
              : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Light Mode"
        >
          <SunIcon className={`h-7 w-7`} />
        </button>
      </div>
    </div>
  );
}
