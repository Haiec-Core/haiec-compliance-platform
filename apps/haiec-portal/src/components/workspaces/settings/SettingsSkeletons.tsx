import { Skeleton } from "@/components/ui/skeleton";

export const SettingsFormSkeleton = () => {
  return (
    <div className="max-w-md p-6 space-y-6 rounded-md">
      <div className="space-y-3">
        <div className="text-lg font-semibold">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="text-sm">
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <div className="text-lg font-semibold">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="text-sm">
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="pt-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};
