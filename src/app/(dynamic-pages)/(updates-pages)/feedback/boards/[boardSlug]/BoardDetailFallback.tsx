import { Skeleton } from "@/components/ui/skeleton";

export function BoardDetailFallback() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-32" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
        </div>
    );
}
