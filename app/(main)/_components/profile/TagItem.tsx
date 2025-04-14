"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "@/generated/prisma";
import { X } from "lucide-react";
import React from "react";
import { deleteTagAction } from "../../_actions/profile";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "@/components/common/DeleteDialog";

export default function TagItem({ tag }: { tag: Tag }) {
  const handleDelete = async () => {
    try {
      toast.loading("Tag deleting ...", {
        id: "tag-deletion",
      });
      await deleteTagAction(tag.id);
      toast.success("Tag deleted successfully.", {
        id: "tag-deletion",
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, {
          id: "tag-deletion",
        });
      else
        toast.error("Something went wrong!", {
          id: "tag-deletion",
        });
    }
  };

  return (
    <Badge
      className="flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {tag.name}
      <DeleteDialog
        onDelete={handleDelete}
        title="tag"
        trigger={
          <Button variant="ghost" size="sm">
            <X size={3} />
          </Button>
        }
      />
    </Badge>
  );
}
