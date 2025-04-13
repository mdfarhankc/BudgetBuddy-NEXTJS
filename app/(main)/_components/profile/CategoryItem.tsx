"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/generated/prisma";
import { toast } from "sonner";
import DeleteDialog from "./DeleteAccountDialog";
import { deleteCategoryAction } from "../../_actions/profile";

export default function CategoryItem({ category }: { category: Category }) {
  const handleDelete = async () => {
    try {
      toast.loading("Category deleting ...", {
        id: "category-deletion",
      });
      await deleteCategoryAction(category.id);
      toast.success("Category deleted successfully.", {
        id: "category-deletion",
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, {
          id: "category-deletion",
        });
      else
        toast.error("Something went wrong!", {
          id: "category-deletion",
        });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold text-center">
          {category.icon}
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <DeleteDialog onDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
}
