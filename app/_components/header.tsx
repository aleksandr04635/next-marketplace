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
import CartButton from "./cart-button";

export const Header = () => {
  //const pathname = usePathname();
  // const user = useCurrentUser();

  //rounded-xl bg-secondary  h-16
  return (
    <nav
      className=" bg-white dark:bg-dark-additional-bg/40  
    pl-1 sm:pl-4 py-3 pr-[25px] sm:pr-[25px] w-full h-fit shadow-sm border-layout-border border-b"
    >
      <div className="flex w-full flex-col">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-5 md:gap-10 lg:gap-16">
          <div className="w-full flex justify-between items-center gap-2">
            <MenuDropdown>
              <SideContent>
                <StoreSidebar />
              </SideContent>
            </MenuDropdown>
            <Link className="" href={`/`}>
              <MyButton className=" font-semibold">
                My&nbsp;Marketplace
              </MyButton>
            </Link>
            <Link
              className=" link-stand text-base "
              href={`/about`}
              target="_blank"
              rel="noopener noreferrer"
            >
              About&nbsp;this&nbsp;project
            </Link>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <SearchFormForHeader type="wide-scr" />
            <ThemeSwitch />
            <CartButton />
            <UserButton />
          </div>
        </div>
        <SearchFormForHeader type="narrow-scr" />
      </div>
    </nav>
  );
};
