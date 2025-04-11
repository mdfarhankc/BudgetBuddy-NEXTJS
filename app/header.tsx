import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto container flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
