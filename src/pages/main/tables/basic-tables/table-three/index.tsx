import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils";
import { type PaginationState, useTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import CardFooter from "./card-footer";
import CardHeader from "./card-header";
import { latestTransactionsData } from "./data";
import TransactionTable from "./transaction-table";
import type { TableThreeProps, Transaction } from "./types";
import {
  tableThreeColumns,
  tableThreeFeatures,
  tableThreeGlobalFilterFn,
} from "./utils";

export default function TableThree({
  data = latestTransactionsData,
  className,
  itemsPerPage = 7,
}: TableThreeProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });

  const table = useTable({
    features: tableThreeFeatures,
    data,
    columns: tableThreeColumns,
    getRowId: (row: Transaction) => String(row.id),
    state: {
      globalFilter: searchQuery,
      pagination,
    },
    onPaginationChange: setPagination,
    globalFilterFn: tableThreeGlobalFilterFn,
  });

  const totalPages = Math.max(1, table.getPageCount());

  // Keep pagination pageSize synced if itemsPerPage changes
  useEffect(() => {
    setPagination((prev) => {
      if (prev.pageSize === itemsPerPage) return prev;
      return { ...prev, pageSize: itemsPerPage, pageIndex: 0 };
    });
  }, [itemsPerPage]);

  // Keep pageIndex within valid bounds when filtered results or data count change
  useEffect(() => {
    if (pagination.pageIndex >= totalPages) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.max(0, totalPages - 1),
      }));
    }
  }, [totalPages, pagination.pageIndex]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handlePageChange = (page: number) => {
    const targetPageIndex = Math.max(0, Math.min(page - 1, totalPages - 1));
    setPagination((prev) => ({ ...prev, pageIndex: targetPageIndex }));
  };

  const currentPage = Math.min(pagination.pageIndex + 1, totalPages);

  return (
    <Card
      className={cn(
        "w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3",
        className,
      )}
    >
      <CardHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <CardContent className="p-0">
        <TransactionTable table={table} />
      </CardContent>

      <CardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Card>
  );
}
