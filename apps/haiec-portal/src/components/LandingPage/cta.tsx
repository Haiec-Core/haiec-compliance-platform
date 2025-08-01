import { Button } from "@/components/ui/button";
import { Sailboat } from "lucide-react";
import TitleBlock from "../title-block";

export default function CTA() {
  return (
    <div className="py-16 px-6 flex flex-col justify-center items-center space-y-6 bg-muted">
      <TitleBlock
        icon={<Sailboat size={16} />}
        section="Start you journey"
        title="Ready to move with ultimate?"
        subtitle="CI/CD streamlines feature delivery, scalable infrastructure ensures global edge optimization and app monitoring capabilities for peak site performance."
      />
      <Button className="px-6">Get Started</Button>
    </div>
  );
}
