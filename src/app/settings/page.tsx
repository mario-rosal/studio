import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParametersTable } from "@/components/settings/parameters-table";
import { UsersTable } from "@/components/settings/users-table";

export default function SettingsPage() {
  return (
    <Tabs defaultValue="parameters">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="parameters">Parameters</TabsTrigger>
        <TabsTrigger value="users">Users & Roles</TabsTrigger>
      </TabsList>
      <TabsContent value="parameters">
        <ParametersTable />
      </TabsContent>
      <TabsContent value="users">
        <UsersTable />
      </TabsContent>
    </Tabs>
  );
}
