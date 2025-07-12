import { LogsTable } from "@/components/logs/logs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions() {
    const result = await db.query<Execution>('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows;
}

export default async function LogsPage() {
  const executions = await getExecutions();
  return (
    <div>
      <LogsTable initialExecutions={executions} />
    </div>
  );
}
