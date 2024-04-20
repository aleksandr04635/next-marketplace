"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary dark:bg-dark-active-bg">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-l from-cyan-400 via-blue-500 to-purple-600 " />{" "}
      {/* bg-primary */}
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-full border-2 border-blue-500 dark:border-cyan-500 bg-background 
      ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 
      focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50" /* border-primary */
    />
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-full border-2 border-blue-500 dark:border-cyan-500 bg-background 
    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 
    focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

/* className="block h-4 w-4 rounded-full border-2 border-blue-500 dark:border-cyan-500 bg-background 
ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" */

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
"main-border-light": "#0ac6db", */
