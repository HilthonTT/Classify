"use client";

import { UserButton } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl xl:text-3xl text-neutral-600">Trash</h1>
        <UserButton />
      </div>
      <Separator className="my-4" />
    </>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Separator className="my-4" />
    </>
  );
};
