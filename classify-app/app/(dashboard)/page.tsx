import { getSummary } from "@/lib/summary-service";
import { getActivities } from "@/lib/activity-service";
import { getItems, getRecentItems } from "@/lib/item-service";

import { Activity } from "./_components/activity";
import { Header } from "./_components/header";
import { Summary } from "./_components/summary";
import { RecentItems } from "./_components/recent-items";

const MAX_ITEMS_COUNT = 5;

const DashboardPage = async () => {
  const [summary, activities, recentItems] = await Promise.all([
    getSummary(),
    getActivities(MAX_ITEMS_COUNT),
    getRecentItems(MAX_ITEMS_COUNT),
  ]);

  return (
    <div className="w-full h-full p-7">
      <Header />
      <Summary summary={summary} />
      <Activity activities={activities} />
      <RecentItems recentItems={recentItems} />
    </div>
  );
};

export default DashboardPage;
