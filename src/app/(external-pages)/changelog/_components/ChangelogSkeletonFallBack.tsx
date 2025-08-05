import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ChangelogListSkeletonFallBack() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">Changelog List</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        This is the changelog for the application. It will be updated as new
        features are added and bugs are fixed.
      </p>
      <div className="mt-6 space-y-6">
        <div className="border rounded-md p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-16 h-6" />
            <Badge variant="secondary">NEW</Badge>
          </div>
          <Skeleton className="h-64 rounded-md" />
        </div>
        <div className="border rounded-md p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-16 h-6" />
          </div>
          <Skeleton className="h-64 rounded-md" />
        </div>
      </div>
    </div>
  );
}
