import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import CreateAccountDialog from "./CreateAccountDialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export default async function AccountsSection() {
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");

  const accounts = await prisma.account.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <Card className="w-5xl max-w-7xl">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>Manage your accounts.</CardDescription>
        </div>
        <CreateAccountDialog />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountItem key={account.id} account={account} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const AccountItem = ({ account }: { account: Account }) => {
  return (
    <Card className="w-xs">
      <CardHeader>
        <CardTitle className="font-bold text-center">
          {account.icon}
          {account.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-center">
        Balance: {account.balance}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={"destructive"}>
          <Trash2Icon /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
