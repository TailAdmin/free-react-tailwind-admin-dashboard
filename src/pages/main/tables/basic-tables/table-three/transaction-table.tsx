import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader as TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils";
import EmptyState from "./empty-state";
import TransactionRow from "./transaction-row";
import type { TransactionTableProps } from "./types";

export default function TransactionTable({
  table,
  className,
}: TransactionTableProps) {
  const rows = table.getRowModel().rows;

  return (
    <ScrollArea className={cn("w-full", className)}>
      <Table>
        <TableHead className="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            <TableCell
              isHeader
              className="h-11 min-w-44 py-3 ps-5 text-start text-sm font-normal text-gray-500 sm:ps-6 dark:text-gray-400"
            >
              Name
            </TableCell>
            <TableCell
              isHeader
              className="h-11 min-w-44 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Date
            </TableCell>
            <TableCell
              isHeader
              className="h-11 min-w-32 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Price
            </TableCell>
            <TableCell
              isHeader
              className="h-11 min-w-36 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Category
            </TableCell>
            <TableCell
              isHeader
              className="h-11 min-w-28 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Status
            </TableCell>
            <TableCell isHeader className="h-11 min-w-16 py-3 pe-5 sm:pe-6" />
          </TableRow>
        </TableHead>

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {rows.length > 0 ? (
            rows.map((row) => (
              <TransactionRow
                key={row.original.id}
                transaction={row.original}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
