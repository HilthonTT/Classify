"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateItemModal } from "@/store/use-create-item-modal";

import { SearchInput } from "./search-input";
import { SelectSort } from "./select-sort";

export const Header = () => {
  const { onOpen } = useCreateItemModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl xl:text-3xl text-neutral-600">All Items</h1>
        <div className="space-x-2">
          <Button onClick={onOpen} variant="primary" className="group">
            Add Item
          </Button>
          <Button variant="primary" className="group">
            Add Folder
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between w-full">
        <SearchInput />
        <div className="gap-2">
          <SelectSort />
        </div>
      </div>
    </>
  );
};
