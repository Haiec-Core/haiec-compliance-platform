import { ExternalNavigation } from "@/components/NavigationMenu/ExternalNavbar/ExternalNavigation";

import "./layout.css";
export const dynamic = "force-static";
export const revalidate = 60;


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ExternalNavigation />
      {children}
    </div>
  );
}
