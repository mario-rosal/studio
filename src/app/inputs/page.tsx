import { InputsTable } from "@/components/inputs/inputs-table";
import { executions } from "@/lib/data";

export default function InputsPage() {
  const inputTypes = ['all', ...Array.from(new Set(executions.map(e => e.input_type)))];

  return (
    <div className="flex flex-col gap-4">
      <InputsTable initialExecutions={executions} inputTypes={inputTypes} />
    </div>
  );
}
