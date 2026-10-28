import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils";
import EmptyState from "./empty-state";
import OrderRow from "./order-row";
import type { OrdersTableProps } from "./types";

export default function OrdersTable({
  table,
  onSelect,
  onDelete,
  className,
}: OrdersTableProps) {
  const rows = table.getRowModel().rows;
  const isAllSelected = rows.length > 0 && table.getIsAllRowsSelected();

  const handleSelectAll = () => {
    table.toggleAllRowsSelected();
  };

  return (
    <div className={cn("max-w-full overflow-x-auto", className)}>
      <div className="min-w-175 2xl:min-w-202">
        <Table>
          <TableHeader className="border-y border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <TableRow>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all orders"
                  />
                  <span>Deal ID</span>
                </div>
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Customer
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Product/Service
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Deal Value
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Close Date
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="min-h-96 divide-y divide-gray-100 dark:divide-gray-800">
            {rows.length > 0 ? (
              rows.map((row) => (
                <OrderRow
                  key={row.original.id}
                  order={row.original}
                  isSelected={row.getIsSelected()}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
