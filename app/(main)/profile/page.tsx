import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsSection from "../_components/profile/AccountsSection";
import CategoriesSection from "../_components/profile/CategoriesSection";
import { Suspense } from "react";
import AccountsSectionSkeleton from "../_components/profile/AccountsSectionSkeleton";
import ProfileUserInfoSection from "../_components/profile/ProfileUserInfoSection";
import ProfileUserInfoSkeleton from "../_components/profile/ProfileUserInfoSkeleton";
import TagsSection from "../_components/profile/TagsSection";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TagsSectionSkeleton from "../_components/profile/TagsSectionSkeleton";
import CategoriesSectionSkeleton from "../_components/profile/CategoriesSectionSkeleton";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");

  return (
    <main className="flex-1 px-4 py-3">
      <h1 className="text-5xl tracking-wide font-extrabold text-center my-3 underline">
        Profile
      </h1>
      {/* User Info Section */}
      <Suspense fallback={<ProfileUserInfoSkeleton />}>
        <ProfileUserInfoSection user={session.user} />
      </Suspense>
      <Separator className="my-4" />
      {/* Accounts, Categories, Tags */}
      <section className="max-w-7xl mx-auto container space-y-3">
        <Tabs
          defaultValue="account"
          className="w-full flex items-center justify-center"
        >
          <TabsList className="flex flex-wrap justify-center">
            <TabsTrigger value="account">Accounts</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="tag">Tags</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Suspense fallback={<AccountsSectionSkeleton />}>
              <AccountsSection user={session.user} />
            </Suspense>
          </TabsContent>
          <TabsContent value="category">
            <Suspense fallback={<CategoriesSectionSkeleton />}>
              <CategoriesSection user={session.user} />
            </Suspense>
          </TabsContent>
          <TabsContent value="tag">
            <Suspense fallback={<TagsSectionSkeleton />}>
              <TagsSection user={session.user} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
