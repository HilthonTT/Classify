import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="h-full pl-[100px] sm:pl-[184px]">
        <div className="h-full flex-1">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
