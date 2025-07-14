import { OverviewStats } from "@/components/dashboard/overview-stats";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RecentIOTable } from "@/components/dashboard/recent-io-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions(): Promise<Execution[]> {
  const result = await db.query('SELECT * FROM executions ORDER BY timestamp DESC');
  return result.rows.map(row => ({
    ...row,
    timestamp: new Date(row.timestamp).toISOString(),
  }));
}

export default async function DashboardPage() {
  const executions = await getExecutions();

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <OverviewStats executions={executions} />
      <ActivityChart />
      <RecentIOTable executions={executions} />
    </div>
  );
}
