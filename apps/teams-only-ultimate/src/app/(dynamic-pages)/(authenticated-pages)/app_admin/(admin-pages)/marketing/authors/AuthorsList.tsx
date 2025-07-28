// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/authors/AuthorsList.tsx
"use client";
import { Link } from "@/components/intl-link";
import { Typography } from "@/components/ui/Typography";
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
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { CreateMarketingAuthorProfileButton } from "./CreateMarketingAuthorProfileButton";
import { DeleteAuthorProfileDialog } from "./DeleteAuthorProfileDialog";

type AuthorsListProps = {
  authors: DBTable<"marketing_author_profiles">[];
};

export const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
  const router = useRouter();

  function onDelete(id: string) {
    console.log("delete", id);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <Typography.H4 className="text-2xl">
          Manage your marketing authors
        </Typography.H4>
        <CreateMarketingAuthorProfileButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((profile) => (
            <motion.tr
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TableCell>
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>{profile.display_name}</TableCell>
              <TableCell>{profile.slug}</TableCell>
              <TableCell>
                {format(new Date(profile.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/app_admin/marketing/authors/${profile.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteAuthorProfileDialog
                    authorId={profile.id}
                    authorName={profile.display_name}
                  />
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};
