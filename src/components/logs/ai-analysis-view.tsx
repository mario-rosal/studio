"use client";

import type { AnalyzeLogsOutput } from "@/ai/flows/analyze-logs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Lightbulb, Wrench } from "lucide-react";

type AiAnalysisViewProps = {
  analysis: AnalyzeLogsOutput | null;
  isLoading: boolean;
};

export function AiAnalysisView({ analysis, isLoading }: AiAnalysisViewProps) {
  if (isLoading) {
    return <AiAnalysisSkeleton />;
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>AI Analysis Summary</CardTitle>
            <CardDescription>A high-level overview of the execution log.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{analysis.summary}</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <div>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Potential issues and observations.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm whitespace-pre-wrap">
          <p>{analysis.insights}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Wrench className="h-6 w-6 text-green-500" />
          <div>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Suggestions for improvement.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm whitespace-pre-wrap">
          <p>{analysis.recommendations}</p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}


function AiAnalysisSkeleton() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
