"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.matches) {
      console.log("from if (mq.matches): ");
      //dispatch(toggleTheme("dark"));
      setTheme("dark");
    }

    // This callback will fire if the perferred color scheme changes without a reload
    // mq.addEventListener("change", (evt) => setIsDark(evt.matches));
    mq.addEventListener("change", (evt) => {
      console.log("change from addEventListener: ");
      //dispatch(toggleTheme(evt.matches ? "dark" : "light"));
      setTheme(evt.matches ? "dark" : "light");
    });
  }, []);

  if (!mounted) {
    console.log("mounted and return: ");
    return <div className=" h-[40px] w-[40px]"></div>;
  }
  /*   useEffect(console.log("resolvedTheme: ", resolvedTheme), [resolvedTheme]); */

  /*   if (resolvedTheme === "dark") {
    return (
      <>
        <FiSun onClick={() => setTheme("light")} />
        now is dark
      </>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <>
        <FiMoon onClick={() => setTheme("dark")} />
        now is light
      </>
    );
  } */
  //console.log("resolvedTheme from outside: ", resolvedTheme);
  return (
    <button
      className="   flex h-[40px] w-[40px]   items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    text-center  dark:hover:bg-dark-active-bg  sm:inline  "
      onClick={() =>
        /*  dispatch(toggleTheme(resolvedTheme === "light" ? "dark" : "light")) */
        {
          console.log("resolvedTheme from onClick: ", resolvedTheme);
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }
      }
    >
      <div
        className="mx-auto flex h-full w-full items-center justify-center rounded-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
      >
        {resolvedTheme === "light" ? (
          <FaMoon className="mx-auto " />
        ) : (
          <FaSun className="mx-auto" />
        )}
      </div>
    </button>
  );
}
