import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectsLoadingFallback } from "./ProjectsLoadingFallback";

export const DashboardLoadingFallback = () => {
  return (
    <div className="flex flex-col space-y-12 mt-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-48 border" />
        <div className="gap-2 md:flex hidden">
          <Skeleton className="h-10 w-48 border" />
          <Skeleton className="h-10 w-48 border" />
        </div>
      </div>
      <div>
        <Skeleton className="h-10 w-48" />
        <ProjectsLoadingFallback quantity={3} />
      </div>
      <Card className="p-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-32 mt-2" />
        <Skeleton className="h-64 w-full mt-4" />
      </Card>
    </div>
  );
};
