"use client";

import { useOrganization } from "@clerk/nextjs";

import { SummaryItem } from "@/components/summary-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Summary as SummaryType } from "@/types/summary";

interface SummaryProps {
  summary: SummaryType;
}

export const Summary = ({ summary }: SummaryProps) => {
  const { organization } = useOrganization();

  if (!organization) {
    return null;
  }

  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <SummaryItem label="Folders" count={summary.folderCount} />
      <SummaryItem label="Items" count={summary.itemCount} />
      <SummaryItem
        label="Total Quantity"
        count={`${summary.unitCount} units`}
      />
      <SummaryItem label="Total Value" count={summary.totalValue} money />
    </div>
  );
};

Summary.Skeleton = function SummarySkeleton() {
  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
};
