"use client";

import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  username: string;
  activity: string;
  date: Date;
}

export const ActivityItem = ({
  username,
  activity,
  date,
}: ActivityItemProps) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return (
    <div className="rounded-md bg-gray-100 text-sm p-4">
      <div className="flex items-center justify-between truncate">
        <span className="font-light text-muted-foreground">
          {username} {activity}
        </span>
        <span className="text-muted-foreground">{formattedDate}</span>
      </div>
    </div>
  );
};
