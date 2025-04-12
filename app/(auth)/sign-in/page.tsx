import React from "react";
import SignInForm from "../components/SignInForm";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin",
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");
  return <SignInForm />;
}
