import { OutputsTable } from "@/components/outputs/outputs-table";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutions(): Promise<Execution[]> {
    const result = await db.query('SELECT * FROM executions ORDER BY timestamp DESC');
    return result.rows.map(row => ({
        ...row,
        timestamp: new Date(row.timestamp).toISOString(),
    }));
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
