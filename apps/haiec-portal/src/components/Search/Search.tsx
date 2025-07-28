"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams ?? undefined);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn("relative flex flex-1", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="block"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams?.get("query")?.toString()}
      />
    </div>
  );
}
