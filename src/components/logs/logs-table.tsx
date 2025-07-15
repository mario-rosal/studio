
"use client";

import React, { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Download, RefreshCw } from "lucide-react";
import type { Execution } from "@/lib/types";
import { analyzeLogs, type AnalyzeLogsOutput } from "@/ai/flows/analyze-logs";
import { AiAnalysisView } from "./ai-analysis-view";

interface LogsTableProps {
    initialExecutions: Execution[];
}

export function LogsTable({ initialExecutions }: LogsTableProps) {
  const [executions, setExecutions] = useState<Execution[]>(initialExecutions);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeLogsOutput | null>(null);
  const [isAnalyzing, startTransition] = useTransition();

  const handleAnalyze = (execution: Execution) => {
    setSelectedExecutionId(execution.id);
    setAnalysis(null);
    startTransition(async () => {
      const result = await analyzeLogs({ logs: execution.logs });
      setAnalysis(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Logs</CardTitle>
        <CardDescription>
          Detailed logs for all automation workflow executions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><span className="sr-only">Details</span></TableHead>
              <TableHead>Flow Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <Accordion type="single" collapsible asChild>
            <TableBody>
              {executions.map((execution) => (
                <AccordionItem value={execution.id} key={execution.id} asChild>
                  <>
                    <TableRow>
                      <TableCell className="w-[50px]">
                        <AccordionTrigger>
                          <span className="sr-only">Details for {execution.id}</span>
                        </AccordionTrigger>
                      </TableCell>
                      <TableCell className="font-medium">{execution.flow_name}</TableCell>
                      <TableCell>
                        <Badge variant={execution.status === "Success" ? "default" : "destructive"} className={execution.status === "Success" ? 'bg-green-500' : ''}>
                          {execution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(execution.timestamp).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{execution.duration}s</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <AccordionContent>
                          <div className="p-4 bg-muted/50 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Input</h4>
                                <div className="p-2 bg-background rounded-md text-sm">
                                  <p><strong>Type:</strong> {execution.input_type}</p>
                                  <p><strong>Data:</strong> {execution.input_data}</p>
                                  {execution.input_attachment && <Button variant="link" size="sm" className="p-0 h-auto"><Download className="mr-1 h-3 w-3" /> Download Attachment</Button>}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Output</h4>
                                <div className="p-2 bg-background rounded-md text-sm">
                                  <p><strong>Type:</strong> {execution.output_type}</p>
                                  <p><strong>Data:</strong> {execution.output_data}</p>
                                  {execution.output_attachment && <Button variant="link" size="sm" className="p-0 h-auto"><Download className="mr-1 h-3 w-3" /> Download Attachment</Button>}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Logs</h4>
                              <pre className="p-4 bg-background rounded-md text-xs overflow-x-auto">
                                {execution.logs}
                              </pre>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleAnalyze(execution)} disabled={isAnalyzing && selectedExecutionId === execution.id}>
                                {isAnalyzing && selectedExecutionId === execution.id ? (
                                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Bot className="mr-2 h-4 w-4" />
                                )}
                                {isAnalyzing && selectedExecutionId === execution.id ? 'Analyzing...' : 'Analyze with AI'}
                              </Button>
                              <Button size="sm" variant="secondary">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Re-run Flow
                              </Button>
                            </div>
                            {selectedExecutionId === execution.id && (
                              <div className="mt-4">
                                <AiAnalysisView analysis={analysis} isLoading={isAnalyzing} />
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </TableCell>
                    </TableRow>
                  </>
                </AccordionItem>
              ))}
            </TableBody>
          </Accordion>
        </Table>
      </CardContent>
    </Card>
  );
}
