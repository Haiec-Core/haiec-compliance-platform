"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DBTable } from "@/types";

interface CustomersTableProps {
  customers: DBTable<"billing_customers">[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer ID</TableHead>
          <TableHead>Workspace ID</TableHead>
          <TableHead>Default Currency</TableHead>
          <TableHead>Billing Email</TableHead>
          <TableHead>Metadata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.gateway_customer_id}>
            <TableCell>{customer.gateway_customer_id}</TableCell>
            <TableCell>{customer.workspace_id}</TableCell>
            <TableCell>{customer.default_currency || "N/A"}</TableCell>
            <TableCell>{customer.billing_email}</TableCell>
            <TableCell>{JSON.stringify(customer.metadata)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
