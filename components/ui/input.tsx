import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

//dark:border-gray-500
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          " flex h-9 w-full rounded-md border border-input dark:border-main-border " +
            " bg-transparent dark:bg-dark-additional-bg/40" +
            " px-3 py-1 text-sm shadow-sm " +
            " transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium " +
            " placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 " +
            " focus-visible:ring-main-border " +
            " disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

/* "dark-active-bg": "#151e37",
"active-bg": "#f2faff",
"dark-main-bg": "#10172a",
"dark-additional-bg": "#1f2937",
"secondary-border": "#6366F1",
"light-additional-bg": "#ffffff",
"main-border": "#078493",
"layout-border": "#0a5b6b",
"additional-text": "#374151",
"dark-additional-text": "#E5E7EB", 
"main-border-light":#0ac6db*/
