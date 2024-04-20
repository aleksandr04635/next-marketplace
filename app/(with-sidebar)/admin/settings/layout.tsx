import { Metadata } from "next";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Settings | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
};
//export const dynamic = "force-dynamic"; //tells next to not cache ay pages in the layout

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <>{children}</>;
};

export default ProtectedLayout;
