import type { ReactNode } from "react";

export type CommonTableSortDirection = "asc" | "desc";

export type CommonTableSorting = {
  columnId: string;
  direction: CommonTableSortDirection;
};

export type CommonTableColumn<TData> = {
  id: string;
  header: ReactNode;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
  getSortValue?: (row: TData) => string | number;
  cell: (row: TData, rowIndex: number) => ReactNode;
};

export type CommonTableProps<TData> = {
  columns: readonly CommonTableColumn<TData>[];
  data: TData[];
  getRowKey: (row: TData, rowIndex: number) => string;
  sorting?: CommonTableSorting | null;
  onSortingChange?: (sorting: CommonTableSorting | null) => void;
  loading?: boolean;
  loadingMessage?: string;
  loadingRows?: number;
  emptyIcon?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  minWidthClassName?: string;
  minBodyHeightClassName?: string;
  maxBodyHeightClassName?: string;
  rowClassName?: (row: TData, rowIndex: number) => string;
  onRowClick?: (row: TData, rowIndex: number) => void;
  pagination?: CommonPagination | undefined;
  footer?: ReactNode;
};

export type CommonPagination = {
  currentPage: number;
  pageSize: number;
  pageSizeOptions: readonly number[];
  totalItems: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};
