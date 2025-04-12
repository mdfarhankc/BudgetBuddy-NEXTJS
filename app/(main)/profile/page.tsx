import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsSection from "../_components/profile/AccountsSection";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");
  return (
    <main className="flex-1 px-4 py-3">
      {/* User Info */}
      <section className="max-w-7xl mx-auto container space-y-3">
        <div className="max-w-5xl mx-auto flex items-center justify-around gap-8">
          {/* Left */}
          <div className="flex-shrink-0">
            <Avatar className="w-48 h-48">
              <AvatarImage
                src={session?.user?.profilePic}
                width={500}
                height={500}
              />
              <AvatarFallback className="text-4xl">
                {session?.user?.name?.toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* right */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Name</h2>
              <p className="text-gray-700">{session.user.name ?? "N/A"}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-700">{session.user.email ?? "N/A"}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Gender</h2>
              <p className="text-gray-700">{session.user.gender ?? "N/A"}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Currency</h2>
              <p className="text-gray-700">
                {session.user.currency
                  ? `${session.user.currency.name} (${session.user.currency.symbol})`
                  : "N/A"}
              </p>
            </div>
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
              <Button variant={"secondary"}>Edit</Button>
              <Button variant={"destructive"}>Delete Account</Button>
            </div>
          </div>
        </div>
      </section>
      <Separator className="my-4" />
      {/* Accounts, Categories, Tags */}
      <section className="max-w-7xl mx-auto container space-y-3">
        <Tabs defaultValue="account" className="w-full flex items-center justify-center">
          <TabsList>
            <TabsTrigger value="account">Accounts</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountsSection />
          </TabsContent>
          <TabsContent value="category">Make changes to your category here.</TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
