"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { Execution } from '@/lib/types';

interface InputsTableProps {
    initialExecutions: Execution[];
    inputTypes: string[];
}

export function InputsTable({ initialExecutions, inputTypes }: InputsTableProps) {
  const [flowNameFilter, setFlowNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredInputs = useMemo(() => {
    return initialExecutions.filter(exec => {
      const flowNameMatch = exec.flow_name.toLowerCase().includes(flowNameFilter.toLowerCase());
      const typeMatch = typeFilter === 'all' || exec.input_type === typeFilter;
      return flowNameMatch && typeMatch;
    });
  }, [initialExecutions, flowNameFilter, typeFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Inputs</CardTitle>
        <CardDescription>A complete log of all inputs processed by your automations.</CardDescription>
        <div className="flex items-center gap-4 pt-4">
          <Input
            placeholder="Filter by Flow Name..."
            value={flowNameFilter}
            onChange={e => setFlowNameFilter(e.target.value)}
            className="max-w-sm"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {inputTypes.map(type => (
                 <SelectItem key={type} value={type}>
                    <span className="capitalize">{type}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flow Name</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInputs.length > 0 ? (
                filteredInputs.map(exec => (
                <TableRow key={exec.id}>
                  <TableCell className="font-medium">{exec.flow_name}</TableCell>
                  <TableCell>{new Date(exec.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{exec.input_type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{exec.input_data}</TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No results found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
