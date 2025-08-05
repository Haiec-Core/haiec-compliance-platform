import { ApplicationLayoutShell } from "@/components/ApplicationLayoutShell";
import { SidebarFooterUserNav } from "@/components/sidebar-footer-user-nav";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { getMaybeChatById } from "@/data/user/chat";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ChatSidebar } from "./chat-sidebar";


export default async function ChatLayout(
  props: {
    children: ReactNode;
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const { id } = params;
  const chat = await getMaybeChatById({ id });

  if (!chat) {
    notFound();
  }

  const sidebarContent = <>
    <SidebarContent>
      <SidebarHistory workspaceId={chat.workspace_id} />
    </SidebarContent>
    <SidebarFooter>
      <SidebarFooterUserNav />
    </SidebarFooter>
  </>


  return (
    <ApplicationLayoutShell sidebar={<ChatSidebar workspaceId={chat.workspace_id} content={sidebarContent} />}>
      <div>
        <Suspense fallback={null}>
        </Suspense>
        <div className="relative flex-1 h-auto w-full overflow-auto">
          <div className="px-6 space-y-6 pb-8">{props.children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
