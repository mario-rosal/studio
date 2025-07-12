import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, AlertCircle, CheckCircle } from "lucide-react";
import db from '@/lib/db';
import type { Execution } from "@/lib/types";

async function getExecutionStats() {
    const result = await db.query(`
        SELECT
            COUNT(*) AS total_executions,
            COUNT(CASE WHEN status = 'Success' THEN 1 END) AS successful_executions,
            AVG(duration) as average_duration,
            MAX(timestamp) as last_execution
        FROM executions
    `);
    const stats = result.rows[0];
    return {
        totalExecutions: Number(stats.total_executions) || 0,
        successfulExecutions: Number(stats.successful_executions) || 0,
        failedExecutions: (Number(stats.total_executions) || 0) - (Number(stats.successful_executions) || 0),
        averageDuration: (Number(stats.average_duration) || 0).toFixed(2),
        lastExecution: stats.last_execution ? new Date(stats.last_execution) : null,
    };
}


export async function OverviewStats() {
  const { totalExecutions, successfulExecutions, failedExecutions, averageDuration, lastExecution } = await getExecutionStats();

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
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
