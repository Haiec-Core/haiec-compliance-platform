"use client";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { X } from "lucide-react";
import * as React from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  selected = [],
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // Ensure selected is always an array
  const safeSelected = Array.isArray(selected) ? selected : [];

  const handleUnselect = React.useCallback(
    (item: string) => {
      onChange(safeSelected.filter((i) => i !== item));
    },
    [onChange, safeSelected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && safeSelected.length > 0) {
            const newSelected = [...safeSelected];
            newSelected.pop();
            onChange(newSelected);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onChange, safeSelected],
  );

  const selectables = React.useMemo(
    () => options.filter((item) => !safeSelected.includes(item.value)),
    [options, safeSelected],
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {safeSelected.map((item) => {
            const option = options.find((option) => option.value === item);
            return (
              <Badge key={item} variant="secondary">
                {option?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-hidden placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    onChange([...safeSelected, option.value]);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
