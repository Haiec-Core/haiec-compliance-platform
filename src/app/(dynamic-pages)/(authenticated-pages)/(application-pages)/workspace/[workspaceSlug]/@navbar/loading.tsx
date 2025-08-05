import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";

export default function LoadingNavbarRoot() {
  return (
    <Skeleton className={cn("w-16 h-6", "flex items-center justify-center")} />
  );
}
