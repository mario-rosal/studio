import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { executions } from "@/lib/data";

export function OverviewStats() {
  const totalExecutions = executions.length;
  const successfulExecutions = executions.filter(e => e.status === 'Success').length;
  const failedExecutions = totalExecutions - successfulExecutions;
  const averageDuration = (executions.reduce((acc, e) => acc + e.duration, 0) / totalExecutions).toFixed(2);
  const lastExecution = new Date(Math.max(...executions.map(e => new Date(e.timestamp).getTime())));

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
            {stat.title === 'Total Executions' && (
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
