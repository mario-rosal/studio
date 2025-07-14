import { LogsTable } from "@/components/logs/logs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions(): Promise<Execution[]> {
    const result = await db.query('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows.map(row => ({
        ...row,
        timestamp: new Date(row.timestamp).toISOString(),
    }));
}

export default async function LogsPage() {
  const executions = await getExecutions();
  return (
    <div>
      <LogsTable initialExecutions={executions} />
    </div>
  );
}
