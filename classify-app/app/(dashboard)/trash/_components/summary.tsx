"use client";

import { SummaryItem } from "@/components/summary-item";
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
