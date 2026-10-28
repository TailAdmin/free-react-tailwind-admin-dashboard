import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  filterFns,
  globalFilteringFeature,
  type Row,
  rowSelectionFeature,
  tableFeatures,
} from "@tanstack/react-table";
import type { CrmOrder, DealStatus } from "./types";

export const tableTwoFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns,
});

export const columnHelper = createColumnHelper<
  typeof tableTwoFeatures,
  CrmOrder
>();

export const tableTwoGlobalFilterFn = (
  row: Row<typeof tableTwoFeatures, CrmOrder>,
  _columnId: string,
  filterValue: unknown,
): boolean => {
  const query =
    typeof filterValue === "string" ? filterValue.trim().toLowerCase() : "";
  if (!query) return true;
  const { dealId, user, productName } = row.original;
  return (
    dealId.toLowerCase().includes(query) ||
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    productName.toLowerCase().includes(query)
  );
};

export const tableTwoColumns = columnHelper.columns([
  columnHelper.accessor("dealId", { id: "dealId" }),
  columnHelper.accessor(
    (row: CrmOrder) => `${row.user.name} ${row.user.email}`,
    { id: "customer" },
  ),
  columnHelper.accessor("productName", { id: "productName" }),
  columnHelper.accessor("dealValue", { id: "dealValue" }),
  columnHelper.accessor("closeDate", { id: "closeDate" }),
  columnHelper.accessor("status", { id: "status", filterFn: "equals" }),
]);

export const statusBadgeConfig: Record<
  DealStatus,
  { label: string; color: "success" | "warning" | "error" }
> = {
  complete: { label: "Complete", color: "success" },
  pending: { label: "Pending", color: "warning" },
  cancel: { label: "Cancel", color: "error" },
};
