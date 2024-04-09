"use client";

import { FaUser } from "react-icons/fa";
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
import { Package } from "lucide-react";
import SignInButton from "./sign-in-button";

export const UserButton = () => {
  const user = useCurrentUser();
  //console.log("user: ", user.image);
  //w-48
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit dark:bg-dark-additional-bg"
          align="end"
        >
          <DropdownMenuLabel>
            <div className=" text-xs">
              <p> {user?.name}</p>
              <p> {user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/admin/settings">
            <DropdownMenuItem className="cursor-pointer">
              <GearIcon className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
          </Link>
          <Link href="/admin/products">
            <DropdownMenuItem className="cursor-pointer">
              <Package className="h-4 w-4 mr-2" />
              {/* <GearIcon className="h-4 w-4 mr-2" /> */}
              My products
            </DropdownMenuItem>
          </Link>
          <LogoutButton>
            <DropdownMenuItem className="cursor-pointer">
              <ExitIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return <SignInButton />;
  }
};
