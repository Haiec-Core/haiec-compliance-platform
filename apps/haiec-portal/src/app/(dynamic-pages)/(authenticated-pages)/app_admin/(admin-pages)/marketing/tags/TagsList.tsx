"use client";

import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DBTable } from "@/types";
import { Edit } from "lucide-react";
import React from "react";
import { DeleteTagDialog } from "./DeleteTagDialog";

type TagsListProps = {
  tags: DBTable<"marketing_tags">[];
};

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.name}</TableCell>
            <TableCell>{tag.slug}</TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/app_admin/marketing/tags/${tag.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteTagDialog tagId={tag.id} tagName={tag.name} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
