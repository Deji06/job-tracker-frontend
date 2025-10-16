"use client";
import { useState, useEffect } from "react";
import { FileUser } from "lucide-react";
import { DataTable } from "@/app/dashboard/data-table";
import { searchColumns } from "@/app/dashboard/search-columns";
import { Job } from "@/app/dashboard/columns";
// import ClipLoader from "react-spinners/ClipLoader";
// import { getAllJobs } from "@/app/dashboardAction";
// import { handleApiError } from "@/app/utils/errorHandler";
// import toast from "react-hot-toast";

const SearchJobContent = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedJobs = localStorage.getItem("userJobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);
  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] rounded-tr-[20px] rounded-br-[20px]">
      <div className="px-7 pt-3 flex flex-col md:flex-row gap-y-2 justify-between sm:items-center">
        <p className="text-[#07090b] font-bold capitalize">Search Jobs</p>
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-[#07090b] w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sm:h-fit mb-5 bg-white mt-2 mx-5 rounded-[20px] px-2 shadow overflow-hidden border-2">
        <div className="py-4 px-2">
          <p className="flex gap-x-2 items-center">
            <FileUser className="w-4 h-4" />
            <span className="capitalize font-bold">search applications</span>
          </p>

            <div className="mt-2">
              <DataTable
                columns={searchColumns}
                totalJobs={jobs.length}
                data={filteredJobs}
                enableFilters={false}
                enableSorting={false}
                enablePagination={false}
              />
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchJobContent;
