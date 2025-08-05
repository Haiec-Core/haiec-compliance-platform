import { Link } from "@/components/intl-link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getIsAppAdmin } from "@/data/user/user";
import {
  Book,
  Briefcase,
  CreditCard,
  FileLineChart,
  HelpCircle,
  Map,
  PenTool,
  Settings,
  Users,
} from "lucide-react";
import { Suspense } from "react";

const adminLinks = [
  {
    label: "Admin Dashboard",
    href: `/app_admin`,
    icon: <FileLineChart className="h-5 w-5" />,
  },
  {
    label: "Payment Gateways",
    href: `/app_admin/payment-gateway`,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: "Users",
    href: `/app_admin/users`,
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Workspaces",
    href: `/app_admin/workspaces`,
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    label: "Application Settings",
    href: `/app_admin/settings`,
    icon: <Settings className="h-5 w-5" />,
  },
  {
    label: "Marketing Authors",
    href: `/app_admin/marketing/authors`,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: "Marketing Tags",
    href: `/app_admin/marketing/tags`,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: "Marketing Blog",
    href: `/app_admin/marketing/blog`,
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    label: "Marketing Feedback List",
    href: `/feedback`,
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    label: "Marketing Changelog List",
    href: `/app_admin/marketing/changelog`,
    icon: <Book className="h-5 w-5" />,
  },
  {
    label: "Marketing Roadmap",
    href: "/roadmap",
    icon: <Map className="h-5 w-5" />,
  },
];

async function AdminPanelSidebar() {
  const isAdmin = await getIsAppAdmin();
  if (!isAdmin) return null;
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel data-testid="admin-panel-label">
        Admin Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        {adminLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild tooltip={link.label}>
              <Link href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export async function SidebarAdminPanelNav() {
  return (
    <Suspense fallback={null}>
      <AdminPanelSidebar />
    </Suspense>
  );
}
