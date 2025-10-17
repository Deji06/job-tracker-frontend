"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Job } from "../dashboard/columns"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const searchColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => (
      <span className="font-medium capitalize text-[12px]">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <span className="capitalize font-medium text-[12px]">
        {row.original.company}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <span className="capitalize font-medium text-[12px]">
        {row.original.location}
      </span>
    ),
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
    cell: ({ row }) => (
      <span className="lowercase text-[12px]">
        {row.original.jobType}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`w-fit font-medium text-[12px] ${
          row.original.status === "APPLIED"
            ? "text-yellow-800 bg-yellow-100 border border-yellow-300 lowercase rounded-[10px] px-3"
            : row.original.status === "INTERVIEW"
            ? "text-blue-800 bg-blue-100 border-blue-300 rounded-[10px] px-3"
            : row.original.status === "OFFERED"
            ? "text-green-800 bg-green-100 border-green-300 rounded-[10px] px-3"
            : "text-red-800 bg-red-100 border-red-300 rounded px-2"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "appliedDate",
    header: "Applied Date",
    cell: ({ row }) => (
      <span className="text-[12px] font-semibold">
        {new Date(row.original.appliedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) =>
      row.original.link ? (
        <a
          href={row.original.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate max-w-[150px] block text-[12px]"
          title={row.original.link}
        >
          {row.original.link}
        </a>
      ) : (
        <span className="text-muted-foreground text-[12px]">
          no link attached
        </span>
      ),
  },
  {
  accessorKey: "notes",
  header: "Notes",
  cell: ({ row }) => {
    const note = row.original.notes;
    if (!note) {
      return <span className="text-muted-foreground text-[12px]">no note</span>;
    }

    return (
      <>
        {/* Desktop version */}
        <span
          className="hidden sm:block truncate max-w-[150px] text-[12px] text-blue-600"
          title={note}
        >
          {note}
        </span>

        {/* Mobile version (tap to view) */}
        <div className="block sm:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <button className="truncate max-w-[120px] text-[12px] text-blue-600">
                {note}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Note</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-700">{note}</p>
            </DialogContent>
          </Dialog>
        </div> 
      </>
    );
  },
  enableSorting: false,
},
];
