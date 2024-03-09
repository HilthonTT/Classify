"use client";

import { useOrganization } from "@clerk/nextjs";

import { SummaryItem } from "@/components/summary-item";
import { Item } from "@/types/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Folder } from "@/types/folder";

interface SummaryProps {
  items: Item[];
  folders: Folder[];
}

export const Summary = ({ items, folders }: SummaryProps) => {
  const { organization } = useOrganization();

  if (!organization) {
    return null;
  }

  return (
    <div className="flex items-center justify-start space-x-4 mt-5">
      <SummaryItem label="Folders" count={folders.length} />
      <SummaryItem label="Items" count={items.length} />
      <SummaryItem label="Total Quantity" count="4 units" />
      <SummaryItem label="Total Value" count="403 &euro;" />
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
