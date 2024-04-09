//"use client";

import { SideContent } from "./side-content ";

export const Sidebar = () => {
  /*  if (pathname.split("/")[1] == "admin") {
    return <AdminSidebar />;
  } else {
    return <StoreSidebar />;
  } */
  return (
    <nav
      className="hidden lg:block  grow-0 shrink-0   p-2
  min-h-[calc(100vh_-_128px)] lg:w-[250px] shadow-sm 
  border-r border-layout-border bg-white dark:bg-dark-additional-bg/40"
    >
      {/*   <SideContent /> */}
    </nav>
  );
};
