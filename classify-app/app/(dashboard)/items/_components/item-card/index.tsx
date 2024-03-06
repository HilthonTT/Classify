"use client";

import Link from "next/link";
import Image from "next/image";

import { Item } from "@/types/item";
import { TabSeparator } from "@/components/tab-separator";

import { Actions } from "./actions";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link href={`/items/${item.id}`} className="group">
      <div className="group rounded-xl bg-gray-100 relative overflow-hidden shadow-sm hover:shadow-lg hover:opacity-95 transition">
        <div className="relative w-full h-36">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt="Image"
              fill
              className="object-cover rounded-xl rounded-b-none"
            />
          )}
        </div>

        <div className="p-4 relative">
          <div className="flex items-center justify-between h-8">
            <span className="text-neutral-600 truncate">{item.name}</span>
            <Actions />
          </div>
          <div className="mt-8 mb-8 flex items-center">
            <span className="truncate text-sm text-muted-foreground">
              {item.quantity} units
            </span>
            <TabSeparator />
            <span>&euro;{item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
