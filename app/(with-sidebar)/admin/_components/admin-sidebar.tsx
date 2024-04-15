"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import MyButton from "@/components/ui/my-button";

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div>
      {/* <h3>Admin Sidebar</h3> */}
      <div className="flex gap-y-2 flex-col ">
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
        <Link href="/admin/settings">
          <MyButton
            className="w-full"
            style={pathname === "/admin/settings" ? "default" : "inactive"}
          >
            Settings
          </MyButton>
        </Link>
        {/*  <Button
          asChild
          variant={pathname === "/admin/categories" ? "default" : "outline"}
        >
          <Link href="/admin/categories">Categories</Link>
        </Button> */}
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
        </Link>
      </div>
    </div>
  );
};
