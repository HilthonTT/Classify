"use client";

import { UserButton } from "@clerk/nextjs";
import { Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className={cn("text-xl xl:text-3xl text-neutral-600")}>
          Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="primary" className="group">
            <div className="bg-blue-400 group-hover:bg-blue-300 transition mr-2 h-7 w-7 rounded-md p-1 flex items-center justify-center">
              <Settings2 />
            </div>
            SET FOLDERS
          </Button>
          <UserButton />
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};
