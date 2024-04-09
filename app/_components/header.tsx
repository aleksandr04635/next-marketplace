//"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/app/_components/user-button";
import ThemeSwitch from "./theme-switch";
import MyButton from "@/components/ui/my-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SignInButton from "./sign-in-button";
import SearchFormForHeader from "./search";
import { MenuDropdown } from "./menu-dropdown";
import { SideContent } from "../(with-sidebar)/_components/side-content ";
import { StoreSidebar } from "../(with-sidebar)/(store)/_components/store-sidebar";

export const Header = () => {
  //const pathname = usePathname();
  // const user = useCurrentUser();

  //rounded-xl bg-secondary  h-16
  return (
    <nav
      className=" bg-white dark:bg-dark-additional-bg/40  
    px-4 py-3 pr-[30px] w-full h-fit shadow-sm border-layout-border border-b"
    >
      <div className="flex w-full flex-col">
        <div className="flex justify-between items-center">
          <MenuDropdown>
            <SideContent>
              <StoreSidebar />
            </SideContent>
          </MenuDropdown>
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
          <UserButton />
        </div>
        <SearchFormForHeader type="narrow-scr" />
      </div>
    </nav>
  );
};
