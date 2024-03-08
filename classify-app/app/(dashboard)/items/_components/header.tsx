"use client";

import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateItemModal } from "@/store/use-create-item-modal";
import { Skeleton } from "@/components/ui/skeleton";

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
          <UserButton />
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

Header.Skeleton = function HeaderSkeleton() {
  return (
    <>
      <div className="items-center justify-between flex-col md:flex-row hidden md:flex">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />

          <div className="ml-2 space-x-2 flex items-center">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        <div className="ml-2 space-x-2 flex items-center">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <Skeleton className="flex md:hidden w-full h-8" />
    </>
  );
};
