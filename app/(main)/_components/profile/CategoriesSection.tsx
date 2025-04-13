import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CreateCategoryDialog from "./CreateCategoryDialog";
import CategoryItem from "./CategoryItem";
import { Session } from "next-auth";

export default async function CategoriesSection({
  user,
}: {
  user: Session["user"];
}) {
  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <Card className="w-2xs sm:w-xl md:w-3xl lg:w-5xl max-w-7xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl tracking-tighter sm:text-left text-center">
            {" - "}Categories{" - "}
          </CardTitle>
          <CardDescription className="sm:text-left text-center">
            Manage your categories here.
          </CardDescription>
        </div>
        <CreateCategoryDialog />
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">
            No categories found. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
