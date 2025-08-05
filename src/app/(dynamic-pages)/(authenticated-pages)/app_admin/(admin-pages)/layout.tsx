import { ApplicationLayoutShell } from "@/components/ApplicationLayoutShell";
import { InternalNavbar } from "@/components/NavigationMenu/InternalNavbar";
import { Alert } from "@/components/ui/alert";

export default async function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <ApplicationLayoutShell sidebar={sidebar}>
      <div className="h-full overflow-y-auto" data-testid="admin-panel-layout">
        <InternalNavbar>
          <div
            data-testid="admin-panel-title"
            className="flex items-center justify-start w-full"
          >
            Admin panel
          </div>
        </InternalNavbar>
        <div className="relative flex-1 h-auto mt-8 w-full">
          <div className="pl-6 pr-12 space-y-6 pb-10">
            <Alert
              variant="default"
              className="hover:bg-primary-100 dark:hover:bg-primary-700 bg-primary-100 dark:bg-primary-700 text-primary-600 dark:text-primary-300"
            >
              All sections of this area are protected and only accessible by
              Application Admins.
            </Alert>
            {children}
          </div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
