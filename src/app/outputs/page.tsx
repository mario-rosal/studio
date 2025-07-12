import { OutputsTable } from "@/components/outputs/outputs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions() {
    const result = await db.query<Execution>('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows;
}

export default async function OutputsPage() {
    const executions = await getExecutions();
    const statuses = ['all', ...Array.from(new Set(executions.map(e => e.status)))];
    return (
        <div className="flex flex-col gap-4">
            <OutputsTable initialExecutions={executions} statuses={statuses}/>
        </div>
    );
}
