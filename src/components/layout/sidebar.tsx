
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, FileText, ArrowRightToLine, ArrowLeftFromLine, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Logo } from "../icons/logo";

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/logs", label: "Logs", icon: FileText },
    { href: "/inputs", label: "Inputs", icon: ArrowRightToLine },
    { href: "/outputs", label: "Outputs", icon: ArrowLeftFromLine },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden border-r bg-sidebar text-sidebar-foreground md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6" />
            <span className="">MyTaskPanel</span>
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
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
