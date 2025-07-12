"use client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { User } from "@/lib/types"

interface UsersTableProps {
    initialUsers: User[];
}

export function UsersTable({ initialUsers }: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage access to the MyTaskPanel dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This section is under construction.</p>
      </CardContent>
    </Card>
  )
}
