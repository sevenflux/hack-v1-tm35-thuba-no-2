import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { Color } from "@/constants/tailwind";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavbar?: boolean;
}

function Layout({
  children,
  className,
  showNavbar = true
}: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col`}>
      {showNavbar && <Navbar />}
      <main className={cn(
        `flex-1 bg-[${Color.background}]`,
        showNavbar ? "mt-auto" : "",
        className
      )}>
        {children}
      </main>
    </div>
  );
}

export default Layout;