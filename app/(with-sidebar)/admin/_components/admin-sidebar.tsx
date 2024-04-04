"use client";
//NOT USED
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div>
      <h3>Admin Sidebar</h3>
      <div className="flex gap-y-2 flex-col ">
        <Button
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
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/settings" ? "default" : "outline"}
        >
          <Link href="/admin/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/categories" ? "default" : "outline"}
        >
          <Link href="/admin/categories">Categories</Link>
        </Button>
      </div>
    </div>
  );
};
