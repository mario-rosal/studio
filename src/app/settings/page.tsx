import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParametersTable } from "@/components/settings/parameters-table";
import { UsersTable } from "@/components/settings/users-table";
import db from '@/lib/db';
import type { Parameter, User } from "@/lib/types";

async function getParameters(): Promise<Parameter[]> {
    const result = await db.query('SELECT * FROM parameters ORDER BY key');
    return result.rows;
}

async function getUsers(): Promise<User[]> {
    const result = await db.query('SELECT * FROM users ORDER BY name');
    return result.rows;
}

export default async function SettingsPage() {
  const parameters = await getParameters();
  const users = await getUsers();

  return (
    <Tabs defaultValue="parameters">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="parameters">Parameters</TabsTrigger>
        <TabsTrigger value="users">Users & Roles</TabsTrigger>
      </TabsList>
      <TabsContent value="parameters">
        <ParametersTable initialParameters={parameters} />
      </TabsContent>
      <TabsContent value="users">
        <UsersTable initialUsers={users} />
      </TabsContent>
    </Tabs>
  );
}
