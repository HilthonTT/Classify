"use client";

import { Box, File, Folder, Landmark } from "lucide-react";

import { Summary as SummaryType } from "@/types/summary";

import { SummaryItem } from "./summary-item";

interface SummaryProps {
  summary: SummaryType;
}

export const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="max-w-5xl mx-auto mt-20">
      <span className="text-xl mb-4">Inventory Summary</span>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <SummaryItem
          icon={File}
          count={summary.itemCount}
          label="Items"
          color="blue"
          backgroundColor="blue"
        />
        <SummaryItem
          icon={Folder}
          count={summary.folderCount}
          label="Folders"
          color="yellow"
          backgroundColor="yellow"
        />
        <SummaryItem
          icon={Box}
          count={summary.unitCount}
          label="Total Quantity"
          color="purple"
          backgroundColor="purple"
        />
        <SummaryItem
          icon={Landmark}
          count={summary.totalValue}
          label="Total Value"
          color="orange"
          backgroundColor="orange"
          money
        />
      </div>
    </div>
  );
};
