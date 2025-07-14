import { InputsTable } from "@/components/inputs/inputs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions(): Promise<Execution[]> {
    const result = await db.query('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows.map(row => ({
        ...row,
        timestamp: new Date(row.timestamp).toISOString(),
    }));
}

export default async function InputsPage() {
  const executions = await getExecutions();
  const inputTypes = ['all', ...Array.from(new Set(executions.map(e => e.input_type)))];

  return (
    <div className="flex flex-col gap-4">
      <InputsTable initialExecutions={executions} inputTypes={inputTypes} />
    </div>
  );
}
