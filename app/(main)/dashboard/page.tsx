import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");
  return <main>DashboardPage</main>;
}
