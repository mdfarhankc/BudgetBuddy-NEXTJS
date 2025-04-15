"use client";

import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  const href = session?.user ? "/dashboard" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur">
      <div className="max-w-7xl mx-auto container flex h-16 items-center justify-between">
        <Logo href={href} />
        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserButton />
          ) : (
            <Button size={"sm"} asChild className="font-bold">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
