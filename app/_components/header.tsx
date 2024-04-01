"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import ThemeSwitch from "./theme-switch";
import MyButton from "@/components/my-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SignInButton from "./sign-in-button";

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
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <ThemeSwitch />
      {user ? <UserButton /> : <SignInButton />}
    </nav>
  );
};
