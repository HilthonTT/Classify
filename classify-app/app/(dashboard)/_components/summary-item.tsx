"use client";

import { LucideIcon } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const summaryVariants = cva("", {
  variants: {
    color: {
      blue: "stroke-sky-400 fill-sky-400",
      yellow: "stroke-yellow-400 fill-yellow-400",
      purple: "stroke-purple-400 fill-purple-400",
      orange: "stroke-orange-400 fill-orange-400",
    },
    backgroundColor: {
      blue: "bg-sky-200",
      yellow: "bg-yellow-200",
      purple: "bg-purple-200",
      orange: "bg-orange-200",
    },
  },
});

interface SummaryItemProps extends VariantProps<typeof summaryVariants> {
  icon: LucideIcon;
  label: string;
  count: string;
}

export const SummaryItem = ({
  icon: Icon,
  label,
  count,
  color,
  backgroundColor,
}: SummaryItemProps) => {
  return (
    <div className="bg-gray-50 rounded-md p-6">
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "rounded-full p-4",
            summaryVariants({ backgroundColor })
          )}>
          <Icon className={cn(summaryVariants({ color }))} />
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <span className="text-3xl font-extrabold">{count}</span>
          <span className="text-base font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
};
