"use client";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

interface SummaryItemProps {
  label: string;
  count: string | number;
  money?: boolean;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const SummaryItem = ({ label, count, money }: SummaryItemProps) => {
  return (
    <div className={cn("flex items-center gap-2", font.className)}>
      <span className="text-muted-foreground text-sm lg:text-xl">{label}:</span>
      <span className="text-sm lg:text-xl font-extrabold">
        {count} {money && <>&euro;</>}
      </span>
    </div>
  );
};
