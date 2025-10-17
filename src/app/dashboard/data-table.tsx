"use client";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalJobs: number;
  setJobs?: React.Dispatch<React.SetStateAction<TData[]>>;
  enableFilters?: boolean; 
  enableSorting?: boolean; 
  enablePagination?: boolean;
}
function DataTablePagination<TData>({ table, totalJobs}: { table: TableType<TData>, totalJobs:number}) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  // const totalFiltered = table.getFilteredRowModel().rows.length ;
  const currentPageRowCount = table.getRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + currentPageRowCount - 1, totalJobs);

  return (
    <div className="flex items-center w-full justify-between px-2 py-4 border-">
      <div className="flex flex-wrap sm:flex-row sm:items-center justify-between md:space-x-6 lg:space-x-8 w-full">
        <div className="flex items-center space-x-2">
          <p className="sm:text-sm text-[13px] font-medium flex gap-x-1">
            <span className="text-[#71717a]">
              Showing 
            </span>
            {totalJobs === 0 ? (
              <>0 entries</>
            ): (
              <>
              {startRow}-{endRow}
              <span className="text-[#71717a]">
                of
              </span> 
              {totalJobs}
              {/* {totalJobs}  */}
              <span className="text-[#71717a]">
                entries
              </span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-center sm:w-fit w-full mt-2 sm:mt-0">
          <div className="flex w-[100px] sm:items-center sm:justify-center text-sm font-medium">
            Page {pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-6 md:space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

// data-table component
export function DataTable<TData, TValue>({
  columns,
  data,
  totalJobs,
  setJobs,
  enableFilters = true,
  enableSorting = true,
  enablePagination = true,

}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFilters ? setColumnFilters : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFilters ? getFilteredRowModel() : undefined,
    onGlobalFilterChange: enableFilters ? setGlobalFilter : undefined,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      // pagination:{pageIndex:0, pageSize:10}
    },
    onPaginationChange: enablePagination ? setPagination : undefined,
    autoResetPageIndex: false,
    debugTable: true,
  });

  // Apply column filters for jobType and status
  useEffect(() => {
    table.getColumn("jobType")?.setFilterValue(jobTypeFilter === "ALL" ? "" : jobTypeFilter);
    table.getColumn("status")?.setFilterValue(statusFilter === "ALL" ? "" : statusFilter);
  }, [jobTypeFilter, statusFilter, table]);

  return (
    <div className="overflow-hidden rounded-md flex flex-col flex-1">
      {/* Filters */}
      {enableFilters && (
        <div className="flex  flex-wrap gap-4 p-4 bg-gray-50 ">
          <Input
            placeholder="Search by title or company..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Job Types</SelectItem>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
              <SelectItem value="REMOTE">Remote</SelectItem>
              <SelectItem value="INTERN">Intern</SelectItem>
              <SelectItem value="CONTRACT">Contract</SelectItem>
              <SelectItem value="ENTRY_LEVEL">Entry Level</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="OFFERED">Offered</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

      )}
      {/* Table with Scroll */}
      <div className="overflow-auto md:flex-1   ">
        <div className="md:max-h-[230px] relative overflow-y-auto ">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 md:text-center ">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Pagination */}
      {enablePagination && (
        <DataTablePagination table={table} totalJobs={totalJobs}/>
      )}
    </div>
  );
}