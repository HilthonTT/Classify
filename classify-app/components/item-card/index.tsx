"use client";

import Link from "next/link";
import Image from "next/image";
import { File } from "lucide-react";

import { Item } from "@/types/item";
import { TabSeparator } from "@/components/tab-separator";
import { Skeleton } from "@/components/ui/skeleton";

import { Actions } from "./actions";
import { ItemActions } from "./item-actions";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link href={`/items/${item.id}`} className="group">
      <div className="group rounded-xl bg-gray-100 relative shadow-sm hover:shadow-lg hover:opacity-95 transition">
        <div className="relative w-full h-36">
          {item.imageUrl && (
            <>
              <Image
                src={item.imageUrl}
                alt="Image"
                fill
                className="object-cover rounded-xl rounded-b-none"
              />
              <ItemActions item={item} />
            </>
          )}
          {!item.imageUrl && (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <File className="h-12 w-12 fill-zinc-300" />
              <ItemActions item={item} />
            </div>
          )}
        </div>

        <div className="p-4 relative overflow-hidden">
          <div className="flex items-center justify-between h-8">
            <span className="text-neutral-600 truncate">{item.name}</span>
            <Actions id={item.id} />
          </div>
          <div className="mt-8 mb-8 flex items-center">
            <span className="truncate text-sm text-muted-foreground">
              {item.quantity} units
            </span>
            <TabSeparator />
            <span className="text-muted-foreground text-sm">
              &euro; {item.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

ItemCard.Skeleton = function ItemCardSkeleton() {
  return <Skeleton className="rounded-xl min-h-[240px] w-full" />;
};
