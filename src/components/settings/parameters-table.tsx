
"use client"
import React, { useState, useRef } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Parameter } from "@/lib/types"
import { createParameter, updateParameter, deleteParameter } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

interface ParametersTableProps {
    initialParameters: Parameter[];
}

export function ParametersTable({ initialParameters }: ParametersTableProps) {
  const { toast } = useToast();
  const [parameters, setParameters] = useState<Parameter[]>(initialParameters);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);

  const addFormRef = useRef<HTMLFormElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);

  async function handleAddSubmit(formData: FormData) {
    const result = await createParameter(formData);
    if (result?.errors) {
      // Handle errors, maybe show them in the form
      console.error(result.errors);
      toast({ title: "Error", description: "Please check the form for errors.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Parameter added successfully." });
      setAddDialogOpen(false);
    }
  }

  function openEditDialog(param: Parameter) {
    setSelectedParameter(param);
    setEditDialogOpen(true);
  }

  async function handleEditSubmit(formData: FormData) {
    if (!selectedParameter) return;
    const result = await updateParameter(selectedParameter.id, formData);
     if (result?.errors) {
      console.error(result.errors);
      toast({ title: "Error", description: "Please check the form for errors.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Parameter updated successfully." });
      setEditDialogOpen(false);
      setSelectedParameter(null);
    }
  }

  async function handleDelete(paramId: string) {
    const result = await deleteParameter(paramId);
    if (result?.message.includes('Error')) {
       toast({ title: "Error", description: result.message, variant: "destructive" });
    } else {
       toast({ title: "Success", description: "Parameter deleted successfully." });
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Automation Parameters</CardTitle>
                <CardDescription>
                Global variables used by your workflows.
                </CardDescription>
            </div>
             <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Parameter
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Parameter</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new global parameter.
                        </DialogDescription>
                    </DialogHeader>
                    <form ref={addFormRef} action={handleAddSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="key">Key</Label>
                          <Input id="key" name="key" placeholder="e.g., API_ENDPOINT" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="value">Value</Label>
                          <Input id="value" name="value" placeholder="e.g., https://api.example.com" />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" name="description" placeholder="Describe what this parameter is used for." />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Parameter</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialParameters.map((param) => (
                <TableRow key={param.id}>
                    <TableCell className="font-mono text-sm">{param.key}</TableCell>
                    <TableCell className="font-mono text-sm">{param.value}</TableCell>
                    <TableCell>{param.description}</TableCell>
                    <TableCell>
                        <AlertDialog>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                              >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => openEditDialog(param)}>Edit</DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                              </AlertDialogTrigger>
                          </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the parameter
                                <span className="font-mono font-bold p-1 bg-muted rounded-sm mx-1">{param.key}</span>
                                and remove its data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(param.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Parameter</DialogTitle>
                <DialogDescription>
                    Update the details for this global parameter.
                </DialogDescription>
            </DialogHeader>
            <form ref={editFormRef} action={handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-key">Key</Label>
                    <Input id="edit-key" name="key" defaultValue={selectedParameter?.key} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-value">Value</Label>
                    <Input id="edit-value" name="value" defaultValue={selectedParameter?.value} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea id="edit-description" name="description" defaultValue={selectedParameter?.description} />
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
