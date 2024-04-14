import { Metadata } from "next";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Shopping cart | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
};
//min-h-[calc(100vh_-_128px)]
//h-fit xl:min-h-[calc(100vh_-_130px)] xl:min-h-fit bg-red-500
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    /*  <div
      className="h-fit w-full flex flex-col gap-y-3 items-center justify-center  min-h-screen
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    > */

    <>{children}</>
  );
};

export default ProtectedLayout;
