import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { RoadmapList } from "./_components/RoadmapList";
import type { RoadmapData } from "./types";

export function AppAdminRoadmap({ roadmapData }: { roadmapData: RoadmapData }) {
  const concatRoadmap = [
    ...roadmapData.plannedCards,
    ...roadmapData.inProgress,
  ];
  return (
    <div className="space-y-6">
      <div className="md:flex gap-4 w-full">
        <div className="flex-1">
          <div className="flex flex-col border rounded-lg bg-card">
            <div className="flex-1 overflow-auto">
              {roadmapData.plannedCards.length > 0 ||
                roadmapData.inProgress.length > 0 ? (
                <>
                  <RoadmapList cards={concatRoadmap} />
                </>
              ) : (
                <div className="text-muted-foreground text-sm py-4 text-center">
                  No items available
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[300px] space-y-4">
          <div className="border rounded-lg bg-card p-4 space-y-3">
            <T.H4 className="font-semibold mt-0">Admin Actions</T.H4>
            <p className="text-sm text-muted-foreground">
              Add new items to the roadmap through the feedback system.
            </p>
            <Link
              href="/feedback"
              className="text-primary underline font-medium text-sm hover:text-primary/80"
            >
              Manage feedback →
            </Link>
          </div>

          <div className="border rounded-lg bg-card p-4 space-y-3">
            <T.H4 className="font-semibold mt-0">Statistics</T.H4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Planned</span>
                <span className="font-medium">
                  {roadmapData.plannedCards.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium">
                  {roadmapData.inProgress.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">
                  {roadmapData.completedCards.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
