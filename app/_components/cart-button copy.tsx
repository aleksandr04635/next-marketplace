"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@/redux/cart/cartSlice";
import { useAppSelector } from "@/redux/store";

export default function CartButton() {
  //const { cart } = useSelector(selectCart);
  //const store = useSelector(selectCart);
  const { cart } = useAppSelector(selectCart);
  console.log("  cart  from CartButton: ", cart);
  let num = 0;
  if (cart) {
    for (let item of cart) {
      num += item.number;
    }
  }
  console.log("   num  from CartButton: ", num);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className=" h-[40px] w-[40px]"></div>;
  }

  //items-center   justify-center text-center
  //mx-auto
  return (
    <Link className="group " href={`/cart`}>
      <div className="relative">
        {num > 0 && (
          <div
            className="px-1 z-10 absolute top-0 right-[-10px] rounded-full
           border border-cyan-500 dark:border-blue-500 bg-white dark:bg-dark-additional-bg  "
          >
            {num}
          </div>
        )}
      </div>
      <button
        className="   flex h-[40px] w-[40px]    rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
      dark:group-hover:bg-dark-active-bg  sm:inline  "
      >
        <div
          className=" flex h-full w-full items-center justify-center rounded-full
   bg-white text-slate-900 group-hover:bg-transparent group-hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:group-hover:bg-transparent "
        >
          <GrCart className=" h-5 w-5" />
        </div>
      </button>
    </Link>
  );
}
