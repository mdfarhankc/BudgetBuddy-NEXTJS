import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CreateTagDialog from "./CreateTagDialog";
import TagItem from "./TagItem";
import { Session } from "next-auth";

export default async function TagsSection({ user }: { user: Session["user"] }) {
  const tags = await prisma.tag.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Tags{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your tags here.
          </CardDescription>
        </div>
        <CreateTagDialog />
      </CardHeader>
      <CardContent>
        {tags.length === 0 ? (
          <p className="text-center text-gray-500">
            No tags found. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map((tag) => (
              <TagItem key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
