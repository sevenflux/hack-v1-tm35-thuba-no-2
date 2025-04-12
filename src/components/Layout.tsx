import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

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
        `flex-1 bg-[#110e18]`,
        showNavbar ? "mt-24" : "",
        className
      )}>
        {children}
      </main>
    </div>
  );
}

export default Layout;