import { OutputsTable } from "@/components/outputs/outputs-table";
import { executions } from "@/lib/data";


export default function OutputsPage() {
    const statuses = ['all', ...Array.from(new Set(executions.map(e => e.status)))];
    return (
        <div className="flex flex-col gap-4">
            <OutputsTable initialExecutions={executions} statuses={statuses}/>
        </div>
    );
}
