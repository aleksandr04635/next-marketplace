"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Package } from "lucide-react";
import { CgMenuBoxed } from "react-icons/cg";
import { BsBoxArrowInDown } from "react-icons/bs";
import { BsBoxArrowUp } from "react-icons/bs";
import MyButton from "@/components/ui/my-button";

export const AdminSidebar = () => {
  const pathname = usePathname();
  console.log("pathname from AdminSidebar : ", pathname);

  return (
    <div>
      {/* <h3>Admin Sidebar</h3> */}
      <div className="flex gap-y-2 flex-col pl-2 pt-2">
        {/*  <Button
          asChild
          variant={pathname === "/admin/server" ? "default" : "outline"}
        >
          <Link href="/admin/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/client" ? "default" : "outline"}
        >
          <Link href="/admin/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/admin" ? "default" : "outline"}
        >
          <Link href="/admin/admin">Admin</Link>
        </Button> */}
        {/*  <Button
          asChild
          variant={pathname === "/admin/settings" ? "default" : "outline"}
        >
          <Link href="/admin/settings">Settings</Link>
        </Button> */}
        {/*  <Button
          asChild
          variant={pathname === "/admin/categories" ? "default" : "outline"}
        >
          <Link href="/admin/categories">Categories</Link>
        </Button> */}
        {/*  <Link href="/admin/settings">
          <MyButton
            className="w-full"
            style={pathname === "/admin/settings" ? "default" : "inactive"}
          >
            Settings
          </MyButton>
        </Link>
        <Link href="/admin/categories">
          <MyButton
            className="w-full"
            style={pathname === "/admin/categories" ? "default" : "inactive"}
          >
            Categories
          </MyButton>
        </Link>
        <Link href="/admin/products">
          <MyButton
            className="w-full"
            style={pathname === "/admin/products" ? "default" : "inactive"}
          >
            Products
          </MyButton>
        </Link>
        <Link href="/admin/orders-for-me">
          <MyButton
            className="w-full"
            style={pathname === "/admin/orders-for-me" ? "default" : "inactive"}
          >
            Orders for me
          </MyButton>
        </Link>
        <Link href="/admin/orders-from-me">
          <MyButton
            className="w-full"
            style={
              pathname === "/admin/orders-from-me" ? "default" : "inactive"
            }
          >
            Orders from me
          </MyButton>
        </Link> */}
        <Link
          href="/admin/settings"
          className={
            "flex flex-row items-center link-stand " +
            (pathname === "/admin/settings"
              ? " !text-cyan-500  dark:!text-blue-500   font-bold "
              : "")
          }
        >
          <GearIcon className="h-4 w-4 mr-2" />
          Settings
        </Link>
        <Link
          href="/admin/categories"
          className={
            "flex flex-row items-center link-stand " +
            (pathname === "/admin/categories"
              ? " !text-cyan-500  dark:!text-blue-500   font-bold"
              : "")
          }
        >
          <CgMenuBoxed className="h-4 w-4 mr-2" />
          Categories
        </Link>
        <Link
          href="/admin/products"
          className={
            "flex flex-row items-center link-stand " +
            (pathname === "/admin/products"
              ? " !text-cyan-500  dark:!text-blue-500   font-bold"
              : "")
          }
        >
          <Package className="h-4 w-4 mr-2" />
          Products
        </Link>
        <Link
          href="/admin/orders-for-me"
          className={
            "flex flex-row items-center link-stand " +
            (pathname === "/admin/orders-for-me"
              ? " !text-cyan-500  dark:!text-blue-500   font-bold"
              : "")
          }
        >
          <BsBoxArrowUp className="h-4 w-4 mr-2" />
          Orders for me
        </Link>
        <Link
          href="/admin/orders-from-me"
          className={
            "flex flex-row items-center link-stand " +
            (pathname === "/admin/orders-from-me"
              ? " !text-cyan-500  dark:!text-blue-500   font-bold"
              : "")
          }
        >
          <BsBoxArrowInDown className="h-4 w-4 mr-2" />
          Orders from me
        </Link>
      </div>
    </div>
  );
};
