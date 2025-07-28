'use client';

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarHeader, SidebarMenu, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ChatSidebar({ workspaceId, content }: { workspaceId: string, content: React.ReactNode }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  return <Sidebar className="group-data-[side=left]:border-r-0">
    <SidebarHeader>
      <SidebarMenu>
        <div className="flex flex-row justify-between items-center">
          <Link
            href="/dashboard"
            onClick={() => {
              setOpenMobile(false);
            }}
            className="flex flex-row gap-3 items-center"
          >
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
              Supabase Chatbot
            </span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                type="button"
                className="p-2 h-fit"
                onClick={() => {
                  setOpenMobile(false);
                  router.push('/dashboard');
                  router.refresh();
                }}
              >
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">New Chat</TooltipContent>
          </Tooltip>
        </div>
      </SidebarMenu>
    </SidebarHeader>
    {
      content
    }
  </Sidebar>
}
