"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className=" h-[40px] w-[40px]"></div>;
  }

  return (
    <Link className="" href={`/`}>
      <button
        className="   flex h-[40px] w-[40px]   items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    text-center  dark:hover:bg-dark-active-bg  sm:inline  "
      >
        <div
          className="mx-auto flex h-full w-full items-center justify-center rounded-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
        >
          <GrCart className=" h-5 w-5" />
        </div>
      </button>
    </Link>
  );
}
