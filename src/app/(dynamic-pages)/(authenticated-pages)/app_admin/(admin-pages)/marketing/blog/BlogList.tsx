// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/BlogList.tsx
import { Link } from "@/components/intl-link";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
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
import { CreateBlogPostButton } from "./CreateBlogPostButton";
import { DeleteBlogPostDialog } from "./DeleteBlogPostDialog";

type BlogListProps = {
  posts: DBTable<"marketing_blog_posts">[];
};

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography.H4>Manage Blog Posts</Typography.H4>
        <CreateBlogPostButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              data-testid={`admin-blog-list-row-${post.id}`}
            >
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.slug}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                  className="capitalize"
                >
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(post.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/app_admin/marketing/blog/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteBlogPostDialog
                    postId={post.id}
                    postTitle={post.title}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
