"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  UserRound
} from "lucide-react";

import AnimatedButton from "./AnimatedButton";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

import { cn } from "@/lib/utils";

// Using tailwind.ts to generate the tailwindCSS properties dynamically is
// impossible because tailwindCSS is a JIT compiler.

function Navbar() {
  const [isOpen,         setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigateItems = [
    { name: "Home",      path: "/",          icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: UserRound }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => usePathname() === path;

  return (
    <nav className={cn(
      `fixed h-24 top-0 min-w-full z-50 flex items-center transition-all 
       duration-300 container px-8 bg-[#110e18]`,
      isScrolled || isOpen 
        ? "py-4 backdrop-blur-lg border-b border-gray-400"
        : "py-6"
    )}>
      <div className={`flex justify-between items-center`}>
        <Link href="/" className={`flex gap-2 items-center`}>
          <div className={
            `flex justify-center items-center w-9 h-9 bg-gradient-to-tr rounded-xl 
             from-[#9b87f5] to-[#0ea5e9] bg-border`
          }>
            <div className={
              `flex justify-center items-center w-6 h-6 font-bold text-white rounded-lg bg-[#110e18]`
            }>
              A
            </div>
          </div>
          <span className={
            `text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-tr from-[#9b87f5] 
             to-[#0ea5e9] text-transparent`
          }>
            AGENT
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden gap-8 items-center md:flex`}>
          {navigateItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                `text-sm font-medium transition-colors hover:text-[#9b87f5]`,
                isActive(item.path) ? `text-[#9b87f5]` : `text-[#99a1af]`
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;