"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import ThemeSwitch from "./theme-switch";
import MyButton from "@/components/my-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SignInButton from "./sign-in-button";
import SearchFormForHeader from "./search";

export const Header = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  //rounded-xl bg-secondary
  return (
    <nav
      className=" bg-white dark:bg-dark-additional-bg/40 flex justify-between items-center 
    p-4 pr-[30px] w-full h-16 shadow-sm border-layout-border border-b"
    >
      <Link className="" href={`/`}>
        <MyButton className=" font-semibold">My Marketplace</MyButton>
      </Link>
      <Link
        className=" link-stand text-base "
        href={`/about`}
        target="_blank"
        rel="noopener noreferrer"
      >
        About this project
      </Link>
      <SearchFormForHeader type="wide-scr" />
      <ThemeSwitch />
      {user ? <UserButton /> : <SignInButton />}
    </nav>
  );
};
