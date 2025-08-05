import { Link } from "@/components/intl-link";
import { Typography } from "@/components/ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  Briefcase,
  CreditCard,
  HelpCircle,
  Map,
  PenTool,
  Settings,
  Users,
} from "lucide-react";

const adminLinks = [
  {
    title: "Payment Gateways",
    description: "Manage payment gateways and transactions",
    href: "/app_admin/payment-gateway",
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    title: "Users",
    description: "Manage user accounts and permissions",
    href: "/app_admin/users",
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: "Workspaces",
    description: "Oversee and manage workspaces",
    href: "/app_admin/workspaces",
    icon: <Briefcase className="h-8 w-8" />,
  },
  {
    title: "Application Settings",
    description: "Configure global application settings",
    href: "/app_admin/settings",
    icon: <Settings className="h-8 w-8" />,
  },
  {
    title: "Marketing Blog",
    description: "Manage blog posts and content",
    href: "/app_admin/marketing/blog",
    icon: <PenTool className="h-8 w-8" />,
  },
  {
    title: "Feedback List",
    description: "View and manage user feedback",
    href: "/feedback",
    icon: <HelpCircle className="h-8 w-8" />,
  },
  {
    title: "Changelog",
    description: "Manage and publish changelogs",
    href: "/app_admin/marketing/changelog",
    icon: <Book className="h-8 w-8" />,
  },
  {
    title: "Roadmap",
    description: "Plan and manage product roadmap",
    href: "/roadmap",
    icon: <Map className="h-8 w-8" />,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography.H1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </Typography.H1>
        <Typography.P className="text-muted-foreground">
          Welcome to the admin dashboard. Manage various aspects of your
          application from here.
        </Typography.P>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link href={link.href} key={link.href} className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {link.title}
                </CardTitle>
                {link.icon}
              </CardHeader>
              <CardContent>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
