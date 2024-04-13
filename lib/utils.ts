import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function slugFromString(str: string) {
  return str
    .replace(/[^a-z\-A-Z0-9-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase();
}

export const DEFAULT_IMAGES = [
  {
    url: "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712551569/contacts/z1twkp38rsmntieeda60.jpg",
  },
  {
    url: "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712544917/contacts/hlpiz8yi2vi8ksfleelk.jpg",
  },
  {
    url: "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712544917/contacts/hlpiz8yi2vi8ksfleelk.jpg",
  },
  {
    url: "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712551569/contacts/z1twkp38rsmntieeda60.jpg",
  },
] as const;

export const PAGE_SIZE = 8;
