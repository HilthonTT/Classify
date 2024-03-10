import { getSummary } from "@/lib/summary-service";

import { Activity } from "./_components/activity";
import { Header } from "./_components/header";
import { Summary } from "./_components/summary";

const DashboardPage = async () => {
  const summary = await getSummary();

  return (
    <div className="w-full h-full p-7">
      <Header />
      <Summary summary={summary} />
      <Activity />
    </div>
  );
};

export default DashboardPage;
