"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { Color } from "@/constants/tailwind";

function Navbar() {
  const [isOpen,         setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigateItems = [
    { name: "Home",      path: "/",          icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: UserRound }
  ];

  const isActive = (path: string) => window.location.pathname === path; // TODO: window is undefined.

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      `fixed h-24 top-0 min-w-full z-50 flex items-center  transition-all 
       duration-300 container px-8 bg-[${Color.background}]`,
      isScrolled || isOpen 
        ? "py-4 backdrop-blur-lg border-b border-gray-400"
        : "py-6"
    )}>
      <div className={`flex items-center justify-between`}>
        <Link href="/" className={`flex items-center gap-2`}>
          <div className={
            `h-9 w-9 rounded-xl bg-gradient-to-tr from-[${Color.textPurple}]
             to-[${Color.textBlue}] flex items-center justify-center bg-border`
          }>
            <div className={
              `h-6 w-6 rounded-lg bg-[#1e1e2e] flex items-center justify-center 
              text-white font-bold`
            }>
              A
            </div>
          </div>
          <span className={
            `text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-tr from-[${Color.textPurple}] 
             to-[${Color.textBlue}] text-transparent`
          }>
            AGENT
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8`}>
          {navigateItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                `text-sm font-medium transition-colors hover:text-[${Color.textPurple}]`,
                isActive(item.path) ? `text-[${Color.textPurple}]` : `text-[${Color.textGray}]`
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