"use client"

import { useEffect, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar() {
  const [isOpen,         setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 container px-8 bg-[#0a0a19]",
      isScrolled || isOpen 
        ? "py-4 backdrop-blur-lg border-b border-border"
        : "py-6"
    )}>
      <div className={`flex items-center gap-2`}>
        <Link href="/" className={`flex items-center gap-2`}>
          <div className={
            `h-9 w-9 rounded-xl bg-gradient-to-tr from-gradient-purple 
             to-[#0ea5e9] flex items-center justify-center bg-border`
          }>
            <div className={
              `h-6 w-6 rounded-lg bg-[#1e1e2e] flex items-center justify-center 
              text-white font-bold`
            }>
              A
            </div>
          </div>
          <span className={`text-xl font-bold tracking-tight bg-clip-text from-[#9b87f5] text-primary`}>
            Agent
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;