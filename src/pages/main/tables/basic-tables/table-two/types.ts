import type { Table } from "@tanstack/react-table";
import type { tableTwoFeatures } from "./utils";

export type DealStatus = "complete" | "pending" | "cancel";

export interface OrderUser {
  name: string;
  email: string;
  initials: string;
  avatarClassName?: string;
}

export interface CrmOrder {
  id: string;
  dealId: string;
  user: OrderUser;
  productName: string;
  dealValue: string;
  closeDate: string;
  status: DealStatus;
}

export interface TableTwoProps {
  data?: CrmOrder[];
  className?: string;
}

export interface OrdersTableProps {
  table: Table<typeof tableTwoFeatures, CrmOrder>;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}
