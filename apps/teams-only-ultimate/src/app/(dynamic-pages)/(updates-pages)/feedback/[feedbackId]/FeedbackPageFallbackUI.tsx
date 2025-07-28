import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { clsx } from "clsx";

export function FeedbackDetailFallback() {
  return (
    <div className="h-full py-2 flex flex-col border rounded-lg">
      <div className="p-6">
        <Skeleton className="w-full h-[200px]" />
      </div>
      <Separator orientation="horizontal" />
      <div className="flex-1 px-10 py-10 overflow-y-auto overflow-x-visible shadow-inner">
        <Skeleton className="h-[150px] w-full rounded-xl" />
      </div>
      <div className="border-t p-4">
        <div className="grid w-full gap-2">
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>
      </div>
    </div>
  );
}

function FeedbackPageFallbackUI({ feedbackId }: { feedbackId: string }) {
  return (
    <div className="h-full flex md:gap-2">
      <div
        className={clsx(
          feedbackId && "hidden",
          "md:flex flex-col flex-1 h-full",
        )}
      >
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="h-[40px]" />
          <div className="flex gap-2">
            <Skeleton className="w-28 h-[32px]" />
            <Skeleton className="w-28 h-[32px]" />
            <Skeleton className="w-28 h-[32px]" />
          </div>
        </div>
        <div className="flex flex-col  flex-1 overflow-y-auto gap-2 mb-4">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>
        <div className="border-t py-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-[40px] w-10" />
            <Skeleton className="h-[40px] w-10" />
            <Skeleton className="h-[40px] w-10" />
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div
        className={clsx(!feedbackId && "hidden", "md:block flex-1 relative")}
      >
        <FeedbackDetailFallback />
      </div>
    </div>
  );
}

export default FeedbackPageFallbackUI;
