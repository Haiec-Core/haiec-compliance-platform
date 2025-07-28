"use client";
import { PageHeading } from "@/components/PageHeading";
import { TabsNavigation } from "@/components/TabsNavigation";
import { Computer, Lock, User } from "lucide-react";
import { useMemo } from "react";

export default function UserSettingsClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = useMemo(() => {
    return [
      {
        label: "Account Settings",
        href: `/user/settings`,
        icon: <User />,
      },
      {
        label: "Developer Settings",
        href: `/user/settings/developer`,
        icon: <Computer />,
      },
      {
        label: "Security",
        href: `/user/settings/security`,
        icon: <Lock />,
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <PageHeading
        title="User Settings"
        subTitle="Manage your account and security settings here."
      />
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
