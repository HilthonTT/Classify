"use client";

import { Separator } from "@/components/ui/separator";

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl xl:text-3xl text-neutral-600">Trash</h1>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center space-x-4"></div>
    </>
  );
};
