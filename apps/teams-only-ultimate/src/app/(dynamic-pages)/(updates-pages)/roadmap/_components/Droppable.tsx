import { T } from "@/components/ui/Typography";
import { useDroppable } from "@dnd-kit/core";
import type React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
  status: string;
  itemCount: number;
}

export function Droppable({ id, children, status, itemCount }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`px-4 py-3 transition-colors duration-200 ${isOver ? "bg-muted/50" : ""
        }`}
    >
      <T.H4 className="font-semibold mb-4 flex items-center justify-between">
        <span>{status}</span>
        <span className="text-sm text-muted-foreground">{itemCount} items</span>
      </T.H4>
      {children}
    </div>
  );
}
