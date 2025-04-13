"use client";

import { Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  const { data: session } = useSession();

  return (
    <Link
      href={session?.user ? "/dashboard" : "/"}
      className="flex items-center justify-center gap-2"
    >
      <Wallet className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold tracking-tight">BudgetBuddy</span>
    </Link>
  );
}
