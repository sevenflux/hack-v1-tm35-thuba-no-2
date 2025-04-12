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
        "p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:shadow-orange-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;