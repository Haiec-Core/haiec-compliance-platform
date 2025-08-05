"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CollapsibleCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleCard({
  title,
  icon,
  children,
  defaultOpen = false,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex gap-1 items-center">
            {icon}
            {title}
          </CardTitle>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", {
              "transform rotate-180": isOpen,
            })}
          />
        </div>
      </CardHeader>
      {isOpen && <CardContent className="space-y-2">{children}</CardContent>}
    </Card>
  );
}
