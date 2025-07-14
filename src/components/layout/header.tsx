import Link from "next/link";
import { cookies } from "next/headers";
import {
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AppSidebar, AppSidebarContent } from "./sidebar";
import { Logo } from "../icons/logo";
import { logout } from "@/lib/actions";
import { PageTitle } from "./page-title";


function getSession() {
  const sessionCookie = cookies().get("auth_session")?.value;
  if (!sessionCookie) return null;
  try {
    return JSON.parse(sessionCookie);
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return null;
  }
}


export function Header() {
  const session = getSession();

  const handleSupportClick = () => {
    window.location.href = "mailto:support@n8npilot.com";
  };
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
       <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="bg-sidebar text-sidebar-foreground h-full">
                <AppSidebarContent session={session} />
              </div>
            </SheetContent>
          </Sheet>
      <div className="w-full flex-1">
        <PageTitle />
      </div>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={session.avatar} alt={session.name} />
                <AvatarFallback>{session.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings" passHref>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
             <DropdownMenuItem onSelect={handleSupportClick}>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logout}>
              <DropdownMenuItem asChild>
                 <button type="submit" className="w-full text-left">Logout</button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
