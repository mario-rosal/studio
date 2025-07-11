import { OverviewStats } from "@/components/dashboard/overview-stats";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RecentIOTable } from "@/components/dashboard/recent-io-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <OverviewStats />
      <ActivityChart />
      <RecentIOTable />
    </div>
  );
}
