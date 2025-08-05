import { ExternalNavigation } from "@/components/NavigationMenu/ExternalNavbar/ExternalNavigation";
import "./layout.css";
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div>
      <ExternalNavigation />
      {children}
    </div>
  );
}
