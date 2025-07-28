"use client";
import { T } from "@/components/ui/Typography";
import { adminUpdateFeedbackStatusAction } from "@/data/feedback";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";
import type { RoadmapData } from "../types";
import { RoadmapList } from "./RoadmapList";

const statusesKey = {
    plannedCards: "planned",
    inProgress: "in_progress",
} as const;

export function DraggableRoadmapContent({
    roadmapData,
}: {
    roadmapData: RoadmapData;
}) {
    const toastRef = useRef<string | number | undefined>(undefined);
    const { execute } = useAction(adminUpdateFeedbackStatusAction, {
        onExecute: () => {
            toastRef.current = toast.loading("Updating feedback status");
        },
        onSuccess: () => {
            toast.success("Feedback status updated", {
                id: toastRef.current,
            });
        },
        onError: () => {
            toast.error("Error updating feedback status", {
                id: toastRef.current,
            });
        },
        onSettled: () => {
            toastRef.current = undefined;
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        if (over) {
            execute({
                feedbackId: event.active.id as string,
                status: statusesKey[over.id as keyof typeof statusesKey],
            });
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex-1 overflow-auto">
                {roadmapData.plannedCards.length > 0 ||
                    roadmapData.inProgress.length > 0 ? (
                    <>
                        <div className="px-4 py-3 border-b">
                            <T.H4 className="font-semibold mt-0">In Progress</T.H4>
                            <RoadmapList isAdmin cards={roadmapData.inProgress} />
                        </div>
                        <div className="px-4 py-3">
                            <T.H4 className="font-semibold mt-0">Planned</T.H4>
                            <RoadmapList isAdmin cards={roadmapData.plannedCards} />
                        </div>
                    </>
                ) : (
                    <div className="text-muted-foreground text-sm py-4 text-center">
                        No items available
                    </div>
                )}
            </div>
        </DndContext>
    );
}
