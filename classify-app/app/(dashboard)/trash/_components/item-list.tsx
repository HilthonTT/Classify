"use client";

import { Item } from "@/types/item";

import { ItemCard } from "./item-card";

interface ItemListProps {
  items: Item[];
}

export const ItemList = ({ items }: ItemListProps) => {
  return (
    <div className="flex flex-col items-start mt-4 space-y-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
