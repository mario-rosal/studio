import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, AlertCircle, CheckCircle, Cpu } from "lucide-react";
import type { Execution } from "@/lib/types";

interface OverviewStatsProps {
  executions: Execution[];
}

export function OverviewStats({ executions }: OverviewStatsProps) {
  const totalExecutions = executions.length;
  const successfulExecutions = executions.filter(e => e.status === 'Success').length;
  const failedExecutions = totalExecutions - successfulExecutions;
  const averageDuration = totalExecutions > 0 ? (executions.reduce((acc, e) => acc + e.duration, 0) / totalExecutions).toFixed(2) : '0.00';
  const totalTokens = executions.reduce((acc, e) => acc + (e.tokens_used || 0), 0);
  const lastExecution = executions.length > 0 ? new Date(Math.max(...executions.map(e => new Date(e.timestamp).getTime()))) : null;

  const stats = [
    {
      title: "Total Executions",
      value: totalExecutions,
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Successful",
      value: successfulExecutions,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Failed",
      value: failedExecutions,
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      title: "Avg. Execution Time",
      value: `${averageDuration}s`,
      icon: Clock,
      color: "text-amber-500",
    },
    {
      title: "Tokens Used",
      value: totalTokens.toLocaleString(),
      icon: Cpu,
      color: "text-violet-500",
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.title === 'Total Executions' && lastExecution && (
              <p className="text-xs text-muted-foreground">
                Last run: {lastExecution.toLocaleTimeString()}
              </p>
            )}
             {stat.title === 'Tokens Used' && (
              <p className="text-xs text-muted-foreground">
                In total across all executions
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
