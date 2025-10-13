"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash, ArrowUpDown,  ChevronsUpDown} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { deleteJob } from "../dashboardAction";

export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  jobType: string;
  status: string;
  appliedDate: string;
  link?: string;
  notes?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export const columns = (
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>,
  handleEdit:(job:Job) => void 
): ColumnDef<Job>[] => [ 
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Job Title
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium capitalize text-[12px]">{row.original.title}</span>,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => <span className="capitalize font-medium text-[12px]">{row.original.company}</span>,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Location
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => <span className="capitalize font-medium text-[12px]">{row.original.location}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "jobType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Job Type
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => <span className="lowercase">{row.original.jobType}</span>,
    enableSorting: true,
    filterFn: "equals",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size='sm'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={`w-fit font-medium text-[12px]  ${
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
    enableSorting: true,
    filterFn: "equals",
  },
  {
    accessorKey: "appliedDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied Date
        <ChevronsUpDown className="h- w-1 text-[#71717a]" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-[12px] font-semibold">
        {new Date(row.original.appliedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
    enableSorting: true,
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
        className="text-blue-600 hover:underline truncate max-w-[150px] block text-[12px] "
        title={row.original.link}
      >
        {row.original.link}
      </a>
    ): (
      <span className="text-muted-foreground"> no link attached</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => 
      row.original.notes ?(
      <span className="truncate max-w-[150px] block text-[12px]" title={row.original.notes}>
        {row.original.notes}
      </span>
    ): (
      <span className="text-muted-foreground">no note</span>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
      const handleJobDelete = async () => {
        const confirmDelete = confirm(`Delete job "${job.title}"?`)
        if(!confirmDelete) return;
        toast.loading('Deleting Job....')
        const res = await deleteJob(job.id)
        // console.log('job id', job.id);
        
        toast.dismiss()
        if(res.success) {
          toast.success(res.message);
          if (setJobs) {
             setJobs(prev => prev.filter(j => (j as any).id !== job.id));
          }
          row.toggleSelected(false)
        } else {
          toast.error(res.message)
        }
      }
      return (
        <div className="flex justify-center gap-x-3">
          <button className="text-blue-600 hover:underline cursor-pointer"
           onClick={() => handleEdit(job)}
          
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button 
          onClick={handleJobDelete}
          className="text-red-600 hover:underline cursor-pointer"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      )

    },
  },
];