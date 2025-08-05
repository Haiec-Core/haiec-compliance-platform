import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-64 border-r md:border-r-0">
        <div className="p-4">
          <Skeleton className="h-10 w-36 rounded-md" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-48 rounded-md" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="mt-6">
          <Skeleton className="h-10 w-48 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
        </div>
        <div className="mt-8">
          <Skeleton className="h-10 w-48 rounded-md" />
          <div className="mt-4">
            <Skeleton className="h-72 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
