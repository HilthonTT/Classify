"use client";

import {
  CreateOrganization,
  OrganizationProfile,
  useOrganizationList,
} from "@clerk/nextjs";
import { Settings } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const SettingsButton = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (userMemberships.data?.length !== 0) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Hint
              label="Settings"
              side="right"
              align="start"
              sideOffset={20}
              alignOffset={-8}>
              <button className="bg-transparent p-2 flex items-center justify-center rounded-md hover:bg-blue-500/90 transition w-full">
                <Settings className="h-6 w-6 lg:hidden block" />
                <div className="items-center gap-2 w-full hidden lg:flex">
                  <Settings className="h-6 w-6" />
                  <span className="text-base truncate text-neutral-300">
                    Settings
                  </span>
                </div>
              </button>
            </Hint>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
          <OrganizationProfile />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Hint
            label="Settings"
            side="right"
            align="start"
            sideOffset={20}
            alignOffset={-8}>
            <button className="bg-transparent p-2 flex items-center justify-center rounded-md hover:bg-blue-500/90 transition w-full">
              <Settings className="h-6 w-6 lg:hidden block" />
              <div className="items-center gap-2 w-full hidden lg:flex">
                <Settings className="h-6 w-6" />
                <span className="text-base truncate text-neutral-300">
                  Settings
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
