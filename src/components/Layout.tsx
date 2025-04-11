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
        "flex-1",
        showNavbar ? "mt-[90px]" : "",
        className
      )}>
        {children}
      </main>
    </div>
  );
}

export default Layout;