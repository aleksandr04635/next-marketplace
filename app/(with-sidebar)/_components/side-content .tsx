"use client";

import { usePathname } from "next/navigation";

import { AdminSidebar } from "../admin/_components/admin-sidebar";
import { StoreSidebar } from "../(store)/_components/store-sidebar";

export const SideContent = () => {
  const pathname = usePathname();
  //console.log("path from Sidebar: ", pathname.split("/"));

  /*  if (pathname.split("/")[1] == "admin") {
    return <AdminSidebar />;
  } else {
    return <StoreSidebar />;
  } */
  return (
    <div>
      {pathname.split("/")[1] == "admin" ? <AdminSidebar /> : <StoreSidebar />}
    </div>
  );
};
