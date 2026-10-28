import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFns,
  globalFilteringFeature,
  type Row,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import type { Transaction } from "./types";

export const tableThreeFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
});

export const columnHelper = createColumnHelper<
  typeof tableThreeFeatures,
  Transaction
>();

export const tableThreeGlobalFilterFn = (
  row: Row<typeof tableThreeFeatures, Transaction>,
  _columnId: string,
  filterValue: unknown,
): boolean => {
  const query =
    typeof filterValue === "string" ? filterValue.trim().toLowerCase() : "";
  if (!query) return true;
  const { name, category, status, price, date } = row.original;
  return (
    name.toLowerCase().includes(query) ||
    category.toLowerCase().includes(query) ||
    status.toLowerCase().includes(query) ||
    price.toLowerCase().includes(query) ||
    date.toLowerCase().includes(query)
  );
};

export const tableThreeColumns = columnHelper.columns([
  columnHelper.accessor("name", { id: "name" }),
  columnHelper.accessor("date", { id: "date" }),
  columnHelper.accessor("price", { id: "price" }),
  columnHelper.accessor("category", { id: "category" }),
  columnHelper.accessor("status", { id: "status" }),
]);
