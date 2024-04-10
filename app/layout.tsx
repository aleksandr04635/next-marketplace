import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { ThemeProvider } from "./_components/theme-provider";
import { ToastProvider } from "./_components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  //h-fit justify-stretch from-sky-200 to-blue-600 gap-y-3 items-center
  //className="w-screen overflow-x-hidden "
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="w-screen overflow-x-hidden ">
          <div className={` ${inter.className}`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster />
              <ToastProvider />
              <div
                className="  relative w-full flex flex-col    min-h-screen bg-white
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      dark:from-[#065179] dark:to-[#0e1425]"
              >
                <Header />
                <div className=" mb-[63px] ">{children}</div>
                <Footer />
              </div>
            </ThemeProvider>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
