"use client";

import { Building, Check, X } from "lucide-react";
import { useOrganizationList } from "@clerk/nextjs";

import { Hint } from "@/components/hint";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { OrgItem } from "./org-item";

export const OrganizationButton = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Hint
            label="Organizations"
            side="right"
            align="start"
            sideOffset={20}
            alignOffset={-8}>
            <button className="bg-transparent p-2 flex items-center justify-center rounded-md hover:bg-blue-500/90 transition w-full">
              <Building className="h-6 w-6 lg:hidden block" />
              <div className="items-center gap-2 w-full hidden lg:flex">
                <Building className="h-6 w-6" />
                <span className="text-base truncate text-neutral-300">
                  Organizations
                </span>
              </div>
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose an organization</DialogTitle>
        </DialogHeader>
        <ul className="space-y-4 mt-4">
          {userMemberships.data.map((mem) => (
            <OrgItem
              key={mem.organization.id}
              id={mem.organization.id}
              name={mem.organization.name}
              imageUrl={mem.organization.imageUrl}
            />
          ))}
        </ul>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </DialogClose>
          <Button variant="ghost" size="icon">
            <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
