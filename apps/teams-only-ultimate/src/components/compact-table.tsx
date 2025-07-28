import {
  TableCell as BaseTableCell,
  TableHead as BaseTableHead,
  TableRow as BaseTableRow,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import * as React from "react";

const CompactTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto rounded-md border">
    <Table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
CompactTable.displayName = "CompactTable";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <BaseTableRow
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <BaseTableHead
    ref={ref}
    className={cn(
      "h-10 px-4 text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <BaseTableCell
    ref={ref}
    className={cn(
      "px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export {
  CompactTable as Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
};

