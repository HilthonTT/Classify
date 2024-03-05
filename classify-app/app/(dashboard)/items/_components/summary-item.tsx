"use client";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

interface SummaryItemProps {
  label: string;
  count: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const SummaryItem = ({ label, count }: SummaryItemProps) => {
  return (
    <div className={cn("flex items-center gap-2", font.className)}>
      <span className="text-muted-foreground text-xl">{label}:</span>
      <span className="text-xl font-extrabold">{count}</span>
    </div>
  );
};
