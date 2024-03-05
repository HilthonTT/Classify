import { Activity } from "./_components/activity";
import { Header } from "./_components/header";
import { Summary } from "./_components/summary";

const DashboardPage = () => {
  return (
    <div className="w-full h-full p-7">
      <Header />
      <Summary />
      <Activity />
    </div>
  );
};

export default DashboardPage;
