"use client";

import { SummaryItem } from "./summary-item";

export const Summary = () => {
  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <SummaryItem label="Folders" count="1" />
      <SummaryItem label="Items" count="3" />
      <SummaryItem label="Total Quantity" count="4 units" />
      <SummaryItem label="Total Value" count="403 &euro;" />
    </div>
  );
};
