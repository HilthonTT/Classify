"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { ActivityLog } from "@/types/activity";
import { EntityType } from "@/types/activity";

interface ActivityItemProps {
  activity: ActivityLog;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const router = useRouter();

  const formattedDate = formatDistanceToNow(activity.dateCreated, {
    addSuffix: true,
  });

  const onClick = () => {
    if (activity.entityType === EntityType.ITEM) {
      router.push(`/items/${activity.entityId}`);
    } else {
      router.push(`/folders/${activity.entityId}/content`);
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      className="rounded-md bg-gray-100 text-sm p-4 hover:bg-gray-200/60 transition">
      <div className="flex items-center justify-between truncate">
        <span className="font-light text-muted-foreground">
          {activity.message}
        </span>
        <span className="text-muted-foreground">{formattedDate}</span>
      </div>
    </div>
  );
};
