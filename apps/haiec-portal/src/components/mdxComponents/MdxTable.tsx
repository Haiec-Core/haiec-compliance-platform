import { cn } from "@/utils/cn";

export function MdxTable({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn(
          className,
          "table-auto w-full border-collapse border-gray-200 dark:border-gray-700",
        )}
        {...props}
      />
    </div>
  );
}

export function MdxTableHeader({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn(
        className,
        "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
      )}
      style={{ wordWrap: "break-word" }}
      {...props}
    />
  );
}

export function MdxTableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return (
    <td
      className={cn(
        className,
        "px-6 py-4 text-sm text-gray-900 dark:text-gray-100",
      )}
      style={{ wordWrap: "break-word" }}
      {...props}
    />
  );
}

export function MdxTableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(className, "border-t border-gray-200 dark:border-gray-700")}
      {...props}
    />
  );
}
