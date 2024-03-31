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

  if (!mounted)
    return (
      <div className=" h-[40px] w-[40px]"></div>
      /*   <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      /> */
    );

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
  //console.log("resolvedTheme: ", resolvedTheme);
  return (
    <button
      className="   flex h-[40px] w-[40px]   items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    text-center  dark:hover:bg-dark-active-bg  sm:inline  "
      onClick={() =>
        /*  dispatch(toggleTheme(resolvedTheme === "light" ? "dark" : "light")) */
        {
          // console.log("resolvedTheme: ", resolvedTheme);
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
