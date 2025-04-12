import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

function GlassCard({
  children,
  className,
  hoverEffect = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card", // user-defined className
        `p-6 transition-all duration-400 glass-gradient backdrop-blur-lg border 
       border-white/10 shadow-sm rounded-xl`,
        hoverEffect && "hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;