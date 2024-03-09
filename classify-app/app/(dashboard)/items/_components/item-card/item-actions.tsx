"use client";

import { FolderSymlink, Plus } from "lucide-react";

import { Hint } from "@/components/hint";
import { Item } from "@/types/item";
import { useUpdateQuantityItemModal } from "@/store/use-update-item-quantity-modal";

interface ItemActionsProps {
  item: Item;
}

export const ItemActions = ({ item }: ItemActionsProps) => {
  const updateItemQuantity = useUpdateQuantityItemModal();

  const handleUpdateQuantity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Hit");

    e.preventDefault();
    e.stopPropagation();

    updateItemQuantity.onOpen(item);
  };

  return (
    <div className="absolute right-2 bottom-3 transform  opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex flex-col space-y-2">
        <Hint
          label="Update Quantity"
          side="left"
          align="start"
          alignOffset={-9}>
          <button
            onClick={handleUpdateQuantity}
            className="rounded-lg bg-gray-600 hover:bg-gray-500 transition p-1">
            <Plus className="stroke-white" />
          </button>
        </Hint>
        <Hint label="Move Folder" side="left" align="start" alignOffset={-9}>
          <button className="rounded-lg bg-gray-600 hover:bg-gray-500 transition p-1">
            <FolderSymlink className="stroke-white" />
          </button>
        </Hint>
      </div>
    </div>
  );
};
