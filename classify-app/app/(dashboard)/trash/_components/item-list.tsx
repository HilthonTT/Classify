"use client";

import { Item } from "@/types/item";

import { ItemCard } from "./item-card";
import { EmptyItems } from "./empty-items";

interface ItemListProps {
  items: Item[];
}

export const ItemList = ({ items }: ItemListProps) => {
  return (
    <>
      <div className="flex flex-col items-start mt-4 space-y-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {items.length === 0 && <EmptyItems />}
    </>
  );
};

ItemList.Skeleton = function ItemListSkeleton() {
  return (
    <div className="flex flex-col items-start mt-4 space-y-4">
      {[...Array(4)].map((_, i) => (
        <ItemCard.Skeleton key={i} />
      ))}
    </div>
  );
};
