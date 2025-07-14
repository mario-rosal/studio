
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, FileText, ArrowRightToLine, ArrowLeftFromLine, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Logo } from "../icons/logo";
import { logout } from "@/lib/actions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/logs", label: "Logs", icon: FileText },
  { href: "/dashboard/inputs", label: "Inputs", icon: ArrowRightToLine },
  { href: "/dashboard/outputs", label: "Outputs", icon: ArrowLeftFromLine },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppSidebarContent({ session }: { session: any }) {
  const pathname = usePathname();

  return (
     <>
        <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6" />
            <span className="">n8nPilot</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent",
                  {
                    "bg-sidebar-accent text-sidebar-primary": pathname === item.href,
                  }
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Separator className="my-2 bg-sidebar-border" />
           <form action={logout}>
            <Button type="submit" variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
        </>
  )
}


export function AppSidebar() {
  return (
    <div className="hidden border-r bg-sidebar text-sidebar-foreground md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
         <AppSidebarContent session={null} />
      </div>
    </div>
  );
}

