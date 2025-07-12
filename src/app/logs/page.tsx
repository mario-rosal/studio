import { LogsTable } from "@/components/logs/logs-table";
import { executions } from "@/lib/data";

export default function LogsPage() {
  return (
    <div>
      <LogsTable initialExecutions={executions} />
    </div>
  );
}
