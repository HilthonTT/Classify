"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ActivityItem } from "./activity-item";

export const Activity = () => {
  const start = new Date("2020-01-01");
  const end = new Date("2024-12-31");

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <span className="text-xl mb-4">Recent Activity</span>
        <Button variant="ghost">
          <Settings2 className="mr-2" />
          All Activity
        </Button>
      </div>
      <div className="mt-4">
        <ActivityItem
          username="John Marston"
          activity="moved 1 quantity ofitem from X to Y"
          date={
            new Date(
              start.getTime() +
                Math.random() * (end.getTime() - start.getTime())
            )
          }
        />
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
