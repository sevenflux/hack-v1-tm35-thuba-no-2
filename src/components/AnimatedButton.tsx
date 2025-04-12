import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "glass";
  size?:
    | "sm"
    | "md"
    | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}: AnimatedButtonProps) {
  const baseStyles =
    `relative overflow-hidden rounded-lg font-medium transition-all duration-300
     focus:outline-one focus:ring-2 focus:ring-offset-2 focus:ring-offset-background`;

  const variantStyles = {
    primary: "bg-agent-purple text-white hover:bg-agent-purple-dark",
    secondary: "bg-secondary text-foreground hover:bg-secondary/80",
    outline: "bg-transparent border border-agent-purple text-agent-purple hover:bg-agent-purple/10",
    glass: cn(
      "glass-button", // user-defined className
      "text-foreground"
    )
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button 
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        loading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className={`flex items-center justify-center`}>
          <svg
            className={cn(
              "animate-rotate",  // user-defined className
              "w-5 h-5 mr-2"
            )}
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        <>
          <span className={`z-10 relative flex gap-2 items-center`}>{children}</span>
          <span 
            className={
              `absolute inset-0 bg-gradient-to-r from-agent-purple-light/20 to-transparent 
               w-full h-full transform translate-x-full transition-transform duration-500
               ease-in-out group-hover:translate-x-0`
            }
          ></span>
        </>
      )}
    </button>
  );
}

export default AnimatedButton;