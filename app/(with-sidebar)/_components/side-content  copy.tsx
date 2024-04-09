//"use client";
import { headers } from "next/headers";

//import { usePathname } from "next/navigation";

import { AdminSidebar } from "../admin/_components/admin-sidebar";
import { StoreSidebar } from "../(store)/_components/store-sidebar";

export const SideContent = () => {
  const headersList = headers();
  const domain = headersList.get("host");
  const fullUrl = headersList.get("referer");
  const pathname = headersList.get("next-url");
  console.log("headersList:", headersList);
  console.log("fullUrl:", fullUrl);
  //const pathname = usePathname();
  console.log("pathname from Sidebar: ", pathname);
  console.log("path from Sidebar: ", pathname?.split("/"));

  /*  if (pathname.split("/")[1] == "admin") {
    return <AdminSidebar />;
  } else {
    return <StoreSidebar />;
  } */
  return (
    <div>
      {pathname?.split("/")[1] == "admin" ? <AdminSidebar /> : <StoreSidebar />}
    </div>
  );
};
