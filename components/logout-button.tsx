"use client";

import { signOut } from "next-auth/react"
import { Button } from "./ui/button";

export default function LogoutButton() {
  return <Button size={"sm"} onClick={() => signOut()} className="cursor-pointer font-bold">Logout</Button>;
}
