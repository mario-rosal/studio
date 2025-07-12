import { InputsTable } from "@/components/inputs/inputs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions() {
    const result = await db.query<Execution>('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows;
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
