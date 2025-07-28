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
import { format } from "date-fns";
import { Edit } from "lucide-react";
import React from "react";
import { DeleteChangelogDialog } from "./DeleteChangelogDialog";

type ChangelogListProps = {
  changelogs: (DBTable<"marketing_changelog"> & {
    marketing_changelog_author_relationship: { author_id: string }[];
  })[];
};

export const ChangelogList: React.FC<ChangelogListProps> = ({ changelogs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {changelogs.map((changelog) => (
          <TableRow key={changelog.id}>
            <TableCell>{changelog.title}</TableCell>
            <TableCell>{changelog.status}</TableCell>
            <TableCell>
              {changelog.marketing_changelog_author_relationship.length}
            </TableCell>
            <TableCell>
              {changelog.created_at
                ? format(new Date(changelog.created_at), "MMM dd, yyyy")
                : "N/A"}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/app_admin/marketing/changelog/${changelog.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteChangelogDialog
                  changelogId={changelog.id}
                  changelogTitle={changelog.title}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
