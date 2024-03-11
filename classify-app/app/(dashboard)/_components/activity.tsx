"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActivityLog } from "@/types/activity";

import { ActivityItem } from "./activity-item";

interface ActivityProps {
  activities: ActivityLog[];
}

export const Activity = ({ activities }: ActivityProps) => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <span className="text-xl mb-4">Recent Activity</span>
        <Button variant="ghost">
          <Settings2 className="mr-2" />
          All Activity
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        {activities?.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Link
          href="/reports"
          className="text-sm text-blue-600 hover:text-blue-500 transition">
          View all activity
        </Link>
      </div>
    </div>
  );
};
