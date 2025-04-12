"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Menu,
  UserRound,
  X
} from "lucide-react";

import AnimatedButton from "./AnimatedButton";
import { Button } from "./ui/_Button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/_DropdownMenu";

import { cn } from "@/lib/utils";

// Using tailwind.ts to generate the tailwindCSS properties dynamically is
// impossible because tailwindCSS is a JIT compiler.

function Navbar() {
  const [isOpen,         setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pathname = usePathname();

  const navigateItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: UserRound }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={cn(
      `fixed top-0 min-w-full z-50 flex transition-all flex-col 
       duration-300 container px-8 bg-[#110e18]`,
      isScrolled || isOpen 
        ? "py-4 backdrop-blur-lg border-b border-[#3a3469]"
        : "py-6"
    )}>
      <div className={`flex justify-between items-center w-full`}>
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
                isActive(item.path) ? "text-[#9b87f5]" : "text-[#99a1af]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden text-[#99a1af]`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden py-4 mt-4 animate-fade-in flex flex-col`}>
          <div className={`flex flex-col gap-4`}>
            {navigateItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-xl transition-colors",
                  isActive(item.path)
                    ? "bg-[#2d293d] text-[#9b87f5]"
                    : "text-[#99a1af] hover:bg-[#2d293d] hover:text-[#f1f1f4]"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;