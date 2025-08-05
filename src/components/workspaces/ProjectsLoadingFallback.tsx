import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  quantity: number;
};

const ProjectsLoadingFallback = ({ quantity }: Props) => {
  return (
    <div className="flex w-full gap-4 p-4 overflow-x-auto mt-6">
      {[...Array(quantity)].map((_, i) => (
        <Card
          className="flex flex-col items-start p-4 bg-card min-h-32 rounded-lg shadow-sm w-72"
          key={`${i}skeleton`}
        >
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-6 w-36 mb-1" />
          <Skeleton className="h-4 w-16" />
        </Card>
      ))}
    </div>
  );
};

export { ProjectsLoadingFallback };
