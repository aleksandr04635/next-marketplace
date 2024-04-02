"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      " peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 " +
        " border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 " +
        " focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
        " disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-cyan-700 data-[state=unchecked]:bg-cyan-200 " +
        "dark:data-[state=checked]:bg-cyan-300 dark:data-[state=unchecked]:bg-cyan-700 ",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        " pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 " +
          " transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

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
