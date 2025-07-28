import { formatRelative } from "date-fns";
import { MessageCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getChatsHistory } from "@/data/user/chats";
import { getCachedProjectBySlug } from "@/rsc-data/user/projects";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";

const truncateId = (id: string) => {
  if (id.length > 8) {
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  }
  return id;
};

export async function ChatHistory({ projectSlug }: { projectSlug: string }) {
  const user = await serverGetLoggedInUserVerified();
  const project = await getCachedProjectBySlug(projectSlug);
  const userId = user.id;
  const chatsHistory = await getChatsHistory(project.id, userId);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Chat History</CardTitle>
        <Button variant="default" size="sm" asChild>
          <Link
            href={`/project/${project.slug}/chats/new`}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline">New Chat</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Chat</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chatsHistory.map((chat, index) => (
              <TableRow key={chat.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={`/project/${project.slug}/chats/${chat.id}`}>
                      <MessageCircleIcon className="mr-2 h-4 w-4" />
                      <span className="md:hidden">
                        Chat {truncateId(chat.id)}
                      </span>
                      <span className="hidden md:inline">Chat {chat.id}</span>
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatRelative(new Date(chat.created_at), new Date())}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
