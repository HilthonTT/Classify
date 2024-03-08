"use client";

import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateItemModal } from "@/store/use-create-item-modal";

import { SearchInput } from "./search-input";
import { SelectSort } from "./select-sort";

export const Header = () => {
  const { onOpen } = useCreateItemModal();

  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="flex items-center">
          <h1 className="text-xl xl:text-3xl text-neutral-600">All Items</h1>

          <div className="ml-2 space-x-1 flex items-center justify-center">
            <Button size="icon" variant="ghost" asChild>
              <Link href="/trash">
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Trash</span>
              </Link>
            </Button>
            <Button size="icon" variant="ghost">
              <Link href="/activity-history">
                <Clock className="h-5 w-5" />
                <span className="sr-only">History</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-2 md:mt-0 md:ml-4 space-y-2 md:space-y-0 md:space-x-2 md:flex md:items-center">
          <Button onClick={onOpen} variant="primary" className="group">
            Add Item
          </Button>
          <Button variant="primary" className="group">
            Add Folder
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <SearchInput />
        <div className="mt-4 md:mt-0">
          <SelectSort />
        </div>
      </div>
    </>
  );
};
