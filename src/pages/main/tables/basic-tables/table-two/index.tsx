import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import {
  type ColumnFiltersState,
  type RowSelectionState,
  useTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import CardHeader from "./card-header";
import { recentOrdersData } from "./data";
import OrdersTable from "./orders-table";
import type { CrmOrder, DealStatus, TableTwoProps } from "./types";
import {
  tableTwoColumns,
  tableTwoFeatures,
  tableTwoGlobalFilterFn,
} from "./utils";

export default function TableTwo({
  data = recentOrdersData,
  className,
}: TableTwoProps = {}) {
  const [orders, setOrders] = useState<CrmOrder[]>(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DealStatus | "all">("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    "1": true,
  });

  const columnFilters = useMemo<ColumnFiltersState>(
    () =>
      statusFilter !== "all" ? [{ id: "status", value: statusFilter }] : [],
    [statusFilter],
  );

  const table = useTable({
    features: tableTwoFeatures,
    data: orders,
    columns: tableTwoColumns,
    getRowId: (row: CrmOrder) => row.id,
    state: {
      globalFilter: searchQuery,
      columnFilters,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    globalFilterFn: tableTwoGlobalFilterFn,
  });

  const handleRowSelect = (id: string) => {
    table.getRow(id)?.toggleSelected();
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    setRowSelection((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <Card
      className={cn(
        "w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3",
        className,
      )}
    >
      <CardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <OrdersTable
        table={table}
        onSelect={handleRowSelect}
        onDelete={handleDelete}
      />
    </Card>
  );
}
