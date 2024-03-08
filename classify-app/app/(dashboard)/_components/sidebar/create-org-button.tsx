"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Building2 } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const CreateOrgButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Hint
            label="Make Organizations"
            side="right"
            align="start"
            sideOffset={20}
            alignOffset={-8}>
            <button className="bg-transparent p-2 flex items-center justify-center rounded-md hover:bg-blue-500/90 transition w-full">
              <Building2 className="h-6 w-6 lg:hidden block" />
              <div className="items-center gap-2 w-full hidden lg:flex">
                <Building2 className="h-6 w-6" />
                <span className="text-base truncate text-neutral-300">
                  Make Organizations
                </span>
              </div>
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
