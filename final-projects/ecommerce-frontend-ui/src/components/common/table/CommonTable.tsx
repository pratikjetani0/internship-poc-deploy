import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Loader2,
  SearchX,
} from "lucide-react";
import type {
  CommonTableColumn,
  CommonTableProps,
  CommonTableSorting,
} from "./common-table.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getPaginationRange(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function getNextSorting<TData>(
  column: CommonTableColumn<TData>,
  currentSorting: CommonTableSorting | null | undefined,
): CommonTableSorting | null {
  const isActive = currentSorting?.columnId === column.id;

  if (!isActive) {
    return { columnId: column.id, direction: "asc" };
  }

  if (currentSorting.direction === "asc") {
    return { columnId: column.id, direction: "desc" };
  }

  return null;
}

export function CommonTable<TData>({
  columns,
  data,
  getRowKey,
  sorting = null,
  onSortingChange,
  loading = false,
  loadingMessage = "Loading records...",
  loadingRows = 5,
  emptyIcon,
  rowClassName,
  onRowClick,
  emptyTitle = "No records found",
  emptyDescription = "There is no data to display right now.",
  minWidthClassName = "min-w-[900px]",
  minBodyHeightClassName: minBodyHeightClassNameProp,
  maxBodyHeightClassName,
  pagination,
  footer,
}: CommonTableProps<TData>) {
  const safeColumnCount = Math.max(columns.length, 1);
  const skeletonRows = pagination?.pageSize ?? loadingRows;
  const minBodyHeightClassName =
    minBodyHeightClassNameProp ??
    maxBodyHeightClassName?.replace(/^max-h-/, "min-h-");
  const fixedBodyHeight =
    maxBodyHeightClassName?.match(/max-h-\[([^\]]+)\]/)?.[1];
  const emptyStateMinHeight = fixedBodyHeight
    ? `calc(${fixedBodyHeight} - 2.75rem)`
    : `calc(4.5rem + ${skeletonRows} * 3.5rem)`;

  const footerContent = pagination ? (
    <>
      <p>
        Showing{" "}
        <span className="font-semibold text-foreground">
          {pagination.totalItems === 0 ? 0 : pagination.startItem}-
          {pagination.endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {pagination.totalItems}
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-end gap-4">
        <label className="flex items-center gap-2">
          Rows per page
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(value) =>
              pagination.onPageSizeChange(Number(value))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {pagination.pageSizeOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                href="#"
                aria-disabled={pagination.currentPage === 1}
                tabIndex={pagination.currentPage === 1 ? -1 : undefined}
                className={cn(
                  pagination.currentPage === 1 &&
                    "pointer-events-none opacity-50",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  if (pagination.currentPage > 1) {
                    pagination.onPageChange(pagination.currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {getPaginationRange(
              pagination.currentPage,
              pagination.totalPages,
            ).map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={pagination.currentPage === page}
                    onClick={(event) => {
                      event.preventDefault();
                      pagination.onPageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                text=""
                href="#"
                aria-disabled={pagination.currentPage === pagination.totalPages}
                tabIndex={
                  pagination.currentPage === pagination.totalPages
                    ? -1
                    : undefined
                }
                className={cn(
                  pagination.currentPage === pagination.totalPages &&
                    "pointer-events-none opacity-50",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  if (pagination.currentPage < pagination.totalPages) {
                    pagination.onPageChange(pagination.currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  ) : (
    footer
  );

  return (
    <section className="min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
      <Table
        className={cn("table-fixed ", minWidthClassName)}
        containerClassName={cn(
          "min-w-0 max-w-full",
          maxBodyHeightClassName
            ? "scroll-container overflow-auto"
            : "overflow-x-auto overflow-y-visible",
          maxBodyHeightClassName,
          minBodyHeightClassName,
        )}
      >
        <TableHeader>
          <TableRow className="border-border bg-muted/50 text-[13px] font-bold uppercase tracking-wide text-muted-foreground hover:bg-muted/50">
            {columns.map((column) => {
              const isSortable = Boolean(column.sortable && onSortingChange);
              const isActiveSort = sorting?.columnId === column.id;
              const sortDirection = isActiveSort ? sorting.direction : null;

              return (
                <TableHead
                  key={column.id}
                  className={cn(
                    "h-auto px-4 py-3  font-bold normal-case tracking-wide text-muted-foreground",
                    maxBodyHeightClassName && "sticky top-0 z-10 bg-muted",
                    column.className,
                    column.headerClassName,
                  )}
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (!onSortingChange) return;
                        onSortingChange(getNextSorting(column, sorting));
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 transition-colors hover:text-foreground cursor-pointer",
                        isActiveSort && "text-foreground",
                      )}
                    >
                      <span>{column.header}</span>
                      <span className="inline-flex size-4 shrink-0 items-center justify-center">
                        {sortDirection === "asc" ? (
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        ) : sortDirection === "desc" ? (
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        ) : (
                          <ArrowUpDown
                            className="size-3.5 opacity-50"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="sr-only">
                        {sortDirection === "asc"
                          ? ", sorted ascending"
                          : sortDirection === "desc"
                            ? ", sorted descending"
                            : ", not sorted"}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              <TableRow className="border-border hover:bg-transparent">
                <TableCell colSpan={safeColumnCount} className="px-4 py-6">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    {loadingMessage}
                  </div>
                </TableCell>
              </TableRow>
              {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <TableRow
                  key={`loading-row-${rowIndex}`}
                  className="border-border last:border-b-0 hover:bg-transparent"
                >
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={column.id}
                      className={cn("px-4 py-4", column.cellClassName)}
                    >
                      <div
                        className={cn(
                          "h-4 animate-pulse rounded bg-muted",
                          columnIndex === 0 && "w-8",
                          columnIndex === 1 && "w-3/4",
                          columnIndex > 1 && "w-1/2",
                        )}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : data.length === 0 ? (
            <TableRow className="border-border hover:bg-transparent">
              <TableCell colSpan={safeColumnCount} className="p-0">
                <div
                  className="flex flex-col items-center justify-center px-4 py-14 text-center text-sm text-muted-foreground"
                  style={{ minHeight: emptyStateMinHeight }}
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      {emptyIcon ?? <SearchX className="size-5" />}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {emptyTitle}
                    </span>
                    <span className="mt-1 text-sm text-muted-foreground">
                      {emptyDescription}
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={getRowKey(row, rowIndex)}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={cn(
                  "border-border text-sm text-foreground last:border-b-0 hover:bg-muted/50",
                  onRowClick && "cursor-pointer",
                  rowClassName?.(row, rowIndex),
                )}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn("px-4 py-4", column.cellClassName)}
                  >
                    {column.cell(row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {footerContent ? (
        <div className="flex flex-col gap-3 border-t border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          {footerContent}
        </div>
      ) : null}
    </section>
  );
}
