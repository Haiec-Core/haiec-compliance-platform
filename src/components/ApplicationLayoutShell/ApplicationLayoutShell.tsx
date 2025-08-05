import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
export async function ApplicationLayoutShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset className="overflow-hidden"
        style={{
          maxHeight: "calc(100svh - 16px)",
        }}>
        <div className="overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
