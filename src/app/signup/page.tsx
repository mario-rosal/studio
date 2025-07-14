"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/lib/actions";
import { Logo } from "@/components/icons/logo";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result.success) {
      toast({
        title: "Account Created",
        description: "You have been successfully signed up. Please log in.",
      });
      router.push("/login");
    } else {
        const errorMessage = result.errors ? Object.values(result.errors).flat().join(' ') : 'An unknown error occurred.';
        setError(errorMessage);
        toast({
            title: "Signup Failed",
            description: errorMessage,
            variant: "destructive",
        });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <div className="flex items-center justify-center gap-2 mb-4">
             <Logo className="h-8 w-8" />
            <CardTitle className="text-2xl">Create an Account</CardTitle>
          </div>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max Robinson" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
             {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
