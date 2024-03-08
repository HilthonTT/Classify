"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

interface OrgItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const OrgItem = ({ id, name, imageUrl }: OrgItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) {
      return;
    }

    setActive({ organization: id });
  };

  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "flex items-center border border-gray-200 hover:border-gray-400 rounded-md p-1 gap-2 opacity-75 hover:opacity-100 overflow-hidden transition",
        isActive && "opacity-100"
      )}>
      <UserAvatar username={name} imageUrl={imageUrl} size="md" />
      <span className="text-sm truncate">{name}</span>
      <span className="text-muted-foreground text-xs">
        {isActive && `(SELECTED)`}
      </span>
    </div>
  );
};
