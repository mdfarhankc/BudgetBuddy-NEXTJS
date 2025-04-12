import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Signup",
};

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");
  return <SignUpForm />;
}
