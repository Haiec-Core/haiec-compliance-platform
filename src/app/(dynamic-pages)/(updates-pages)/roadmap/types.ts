import type { DBTable } from "@/types";

export type RoadmapItem = DBTable<"marketing_feedback_threads"> & {
  comment_count: number;
  reaction_count: number;
  date: string;
};

export interface RoadmapData {
  plannedCards: RoadmapItem[];
  inProgress: RoadmapItem[];
  completedCards: RoadmapItem[];
}

export const roadmapStatuses = {
  plannedCards: "Planned",
  inProgress: "In Progress",
  completedCards: "Completed",
} as const;

export type RoadmapStatusKey = keyof typeof roadmapStatuses;
