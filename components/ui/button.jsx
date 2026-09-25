import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          // default styling matching Studio 52 dark theme
          "bg-white text-black hover:bg-white/90 shadow-sm px-4 py-2 font-semibold",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
