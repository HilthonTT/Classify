"use client";

import { ItemCard } from "@/components/item-card";
import { Item } from "@/types/item";

interface RecentItemsProps {
  recentItems: Item[];
}

export const RecentItems = ({ recentItems }: RecentItemsProps) => {
  return (
    <div className="max-w-5xl mx-auto mt-4">
      <div className="flex items-center justify-start">
        <span className="text-xl mb-4">Recent Items</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recentItems.map((item) => (
          <ItemCard item={item} />
        ))}
      </div>
    </div>
  );
};
