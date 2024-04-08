"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full no-underline hover:no-underline; "
      size="sm"
      asChild
    >
      <Link
        className=" link-stand text-base no-underline hover:!no-underline; "
        href={href}
      >
        {label}
      </Link>
    </Button>
  );
};
