"use client";

import { Box, File, Folder, Landmark } from "lucide-react";

import { SummaryItem } from "./summary-item";

export const Summary = () => {
  return (
    <div className="max-w-5xl mx-auto mt-20">
      <span className="text-xl mb-4">Inventory Summary</span>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <SummaryItem
          icon={File}
          count="1"
          label="Items"
          color="blue"
          backgroundColor="blue"
        />
        <SummaryItem
          icon={Folder}
          count="1"
          label="Folders"
          color="yellow"
          backgroundColor="yellow"
        />
        <SummaryItem
          icon={Box}
          count="1"
          label="Total Quantity"
          color="purple"
          backgroundColor="purple"
        />
        <SummaryItem
          icon={Landmark}
          count="1 &euro;"
          label="Total Value"
          color="orange"
          backgroundColor="orange"
        />
      </div>
    </div>
  );
};
