"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  NEW_PRIORITY_OPTIONS,
  NEW_STATUS_OPTIONS,
  NEW_TYPE_OPTIONS,
} from "@/utils/feedback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterState {
  query: string;
  statuses: string[];
  types: string[];
  priorities: string[];
}

export function FeedbackFilterDialog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    query: searchParams?.get("query") || "",
    statuses: searchParams?.get("statuses")?.split(",") || [],
    types: searchParams?.get("types")?.split(",") || [],
    priorities: searchParams?.get("priorities")?.split(",") || [],
  });

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (filters.query) params.set("query", filters.query);
    if (filters.statuses.length)
      params.set("statuses", filters.statuses.join(","));
    if (filters.types.length) params.set("types", filters.types.join(","));
    if (filters.priorities.length)
      params.set("priorities", filters.priorities.join(","));

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const handleToggleOption = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[category] as string[];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const getActiveFiltersCount = () => {
    return (
      (filters.query ? 1 : 0) +
      filters.statuses.length +
      filters.types.length +
      filters.priorities.length
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-none h-auto px-4 py-3"
        >
          Search
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2 p-1">
            <div className={cn("relative flex flex-1")}>
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <Input
                className="block"
                placeholder="Search Feedback..."
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, query: e.target.value }));
                }}
                defaultValue={searchParams?.get("query")?.toString()}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            {NEW_STATUS_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${option.value}`}
                  checked={filters.statuses.includes(option.value)}
                  onCheckedChange={() =>
                    handleToggleOption("statuses", option.value)
                  }
                />
                <label
                  htmlFor={`status-${option.value}`}
                  className="text-sm flex items-center gap-2"
                >
                  <option.icon className="h-3 w-3" />
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Type</h4>
            {NEW_TYPE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${option.value}`}
                  checked={filters.types.includes(option.value)}
                  onCheckedChange={() =>
                    handleToggleOption("types", option.value)
                  }
                />
                <label
                  htmlFor={`type-${option.value}`}
                  className="text-sm flex items-center gap-2"
                >
                  <option.icon className="h-3 w-3" />
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Priority</h4>
            {NEW_PRIORITY_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`priority-${option.value}`}
                  checked={filters.priorities.includes(option.value)}
                  onCheckedChange={() =>
                    handleToggleOption("priorities", option.value)
                  }
                />
                <label
                  htmlFor={`priority-${option.value}`}
                  className="text-sm flex items-center gap-2"
                >
                  <option.icon className="h-3 w-3" />
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({
                query: "",
                statuses: [],
                types: [],
                priorities: [],
              });
            }}
          >
            Reset
          </Button>
          <Button onClick={handleSubmit}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
