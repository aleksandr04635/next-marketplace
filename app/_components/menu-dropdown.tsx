"use client";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SideContent } from "../(with-sidebar)/_components/side-content ";

export const MenuDropdown = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className=" h-[40px] w-[40px]"></div>;

  //w-48 color="red" w-fit
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full  lg:hidden !outline-none ">
        <button
          className="  flex h-[40px] w-[40px]   items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    text-center  dark:hover:bg-dark-active-bg  sm:inline  "
          onClick={() => {}}
        >
          <div
            className="mx-auto flex h-full w-full items-center justify-center rounded-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
          >
            <BiDotsVerticalRounded size={24} />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="ml-2 w-48 dark:bg-dark-additional-bg"
        align="end"
      >
        {children}
        {/* <SideContent /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
