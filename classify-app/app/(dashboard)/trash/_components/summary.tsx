"use client";

import { SummaryItem } from "@/components/summary-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Item } from "@/types/item";

interface SummaryProps {
  items: Item[];
}

export const Summary = ({ items }: SummaryProps) => {
  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <SummaryItem label="Folders" count="1" />
      <SummaryItem label="Items" count={items.length} />
    </div>
  );
};

Summary.Skeleton = function SummarySkeleton() {
  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
};
