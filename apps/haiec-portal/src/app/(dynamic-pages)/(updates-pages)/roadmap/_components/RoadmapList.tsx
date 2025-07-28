"use server";
import { T } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { NEW_STATUS_OPTIONS } from "@/utils/feedback";
import {
  Bug,
  LucideCloudLightning,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { FeedbackAvatarServer } from "../../feedback/[feedbackId]/FeedbackAvatarServer";
import type { RoadmapItem } from "../types";

const typeIcons = {
  bug: <Bug className="h-3 w-3 mr-1 text-destructive" />,
  feature_request: (
    <LucideCloudLightning className="h-3 w-3 mr-1 text-primary" />
  ),
  general: <MessageSquare className="h-3 w-3 mr-1 text-secondary" />,
};

const TAGS = {
  bug: "Bug",
  feature_request: "Feature Request",
  general: "General",
};

const PRIORITY_BADGES = {
  low: { label: "Low Priority", className: "bg-muted text-muted-foreground" },
  medium: {
    label: "Medium Priority",
    className: "bg-blue-500/10 text-blue-500",
  },
  high: {
    label: "High Priority",
    className: "bg-orange-500/10 text-orange-500",
  },
  urgent: { label: "Urgent", className: "bg-destructive/10 text-destructive" },
} as const;

interface RoadmapListProps {
  cards: RoadmapItem[];
  isAdmin?: boolean;
}

export async function RoadmapList({ cards, isAdmin }: RoadmapListProps) {
  return (
    <div className="flex-1 overflow-auto divide-y divide-border">
      {cards.map((item) => {
        const statusOption = NEW_STATUS_OPTIONS.find(
          (option) => option.value === item.status,
        );

        return (
          <Link href={`/feedback/${item.id}`} key={item.id}>
            <div
              key={item.id}
              className="transition-colors duration-200 px-4 py-3 rounded"
            >
              <div className="space-y-2">
                <T.H4 className="font-semibold line-clamp-1 text-base pt-0 mt-0">
                  {item.title}
                </T.H4>

                <T.Small className="text-muted-foreground line-clamp-2 block">
                  {item.content}
                </T.Small>

                <div className="flex items-center justify-between pt-2">
                  <FeedbackAvatarServer feedback={item} />

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {statusOption && (
                        <Badge
                          variant="secondary"
                          className="rounded-full text-[0.7rem] py-0 px-1.5 h-5 flex items-center gap-1"
                        >
                          <statusOption.icon className="h-2.5 w-2.5" />
                          {statusOption.label}
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className="rounded-full text-[0.7rem] py-0 px-1.5 h-5 flex items-center gap-1"
                      >
                        {typeIcons[item.type]} {TAGS[item.type]}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 border-l pl-2">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs">
                          {item.comment_count}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs">
                          {item.reaction_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
