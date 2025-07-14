
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "../icons/logo";

export function PageTitle() {
  const pathname = usePathname();
  const pageTitle = pathname.split('/').filter(Boolean).pop() || 'Dashboard';
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <h1 className="font-semibold text-lg flex items-center gap-2">
        <Logo className="h-6 w-6 md:hidden" />
        <Link href="/" className="hidden md:flex items-center gap-2">
          <Logo className="h-6 w-6" />
          n8nPilot
        </Link>
        <span className="font-normal text-muted-foreground"> / {formattedTitle}</span>
    </h1>
  )
}
