import { Tag } from "@/generated/prisma";
import React from "react";

export default function TagItem({ tag }: { tag: Tag }) {
  return <div>{tag.name}</div>;
}
