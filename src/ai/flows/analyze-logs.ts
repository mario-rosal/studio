'use server';

/**
 * @fileOverview An AI agent that analyzes execution logs and provides summarized insights.
 *
 * - analyzeLogs - A function that analyzes the execution logs.
 * - AnalyzeLogsInput - The input type for the analyzeLogs function.
 * - AnalyzeLogsOutput - The return type for the analyzeLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLogsInputSchema = z.object({
  logs: z.string().describe('The execution logs to analyze.'),
});
export type AnalyzeLogsInput = z.infer<typeof AnalyzeLogsInputSchema>;

const AnalyzeLogsOutputSchema = z.object({
  summary: z.string().describe('A summarized analysis of the execution logs.'),
  insights: z.string().describe('Insights and potential issues identified in the logs.'),
  recommendations: z.string().describe('Recommendations to improve workflow performance based on the log analysis.'),
});
export type AnalyzeLogsOutput = z.infer<typeof AnalyzeLogsOutputSchema>;

export async function analyzeLogs(input: AnalyzeLogsInput): Promise<AnalyzeLogsOutput> {
  return analyzeLogsFlow(input);
}

const analyzeLogsPrompt = ai.definePrompt({
  name: 'analyzeLogsPrompt',
  input: {schema: AnalyzeLogsInputSchema},
  output: {schema: AnalyzeLogsOutputSchema},
  prompt: `You are an AI expert specializing in analyzing execution logs for automation workflows.

You will use the provided logs to identify potential issues, summarize the overall performance, and provide recommendations for improvement.

Analyze the following logs:

{{{logs}}}

Provide a summary of the logs, insights into potential issues, and recommendations for improving workflow performance.  Be as specific as possible.  What specific errors are occurring?  What specific actions are causing errors?  What specific actions can be taken to remediate the errors?

Summary:
Insights:
Recommendations:`, 
});

const analyzeLogsFlow = ai.defineFlow(
  {
    name: 'analyzeLogsFlow',
    inputSchema: AnalyzeLogsInputSchema,
    outputSchema: AnalyzeLogsOutputSchema,
  },
  async input => {
    const {output} = await analyzeLogsPrompt(input);
    return output!;
  }
);
