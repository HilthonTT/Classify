"use client";

import Link from "next/link";
import Image from "next/image";
import { File, FolderSymlink, Plus } from "lucide-react";

import { Item } from "@/types/item";
import { TabSeparator } from "@/components/tab-separator";
import { Hint } from "@/components/hint";

import { Actions } from "./actions";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link href={`/items/${item.id}`} className="group">
      <div className="group rounded-xl bg-gray-100 relative shadow-sm hover:shadow-lg hover:opacity-95 transition">
        <div className="relative w-full h-36">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt="Image"
              fill
              className="object-cover rounded-xl rounded-b-none"
            />
          )}
          {!item.imageUrl && (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <File className="h-12 w-12 fill-zinc-300" />
            </div>
          )}
          <div className="absolute right-2 transform translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col space-y-2">
              <Hint label="Update Quantity">
                <button className="rounded-lg bg-gray-600 hover:bg-gray-500 transition p-1">
                  <Plus className="stroke-white" />
                </button>
              </Hint>
              <Hint label="Move Folder">
                <button className="rounded-lg bg-gray-600 hover:bg-gray-500 transition p-1">
                  <FolderSymlink className="stroke-white" />
                </button>
              </Hint>
            </div>
          </div>
        </div>

        <div className="p-4 relative overflow-hidden">
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
