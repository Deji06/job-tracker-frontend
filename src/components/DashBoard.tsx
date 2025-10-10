"use client";
import { useEffect, useState } from "react";
import { FileUser, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { getAllJobs } from "@/app/dashboardAction";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { columns, Job } from "@/app/dashboard/columns";
import { DataTable } from "@/app/dashboard/data-table";
import { useRouter } from "next/navigation";
// import dayjs from "dayjs";


interface GetJobsResponse {
  success: boolean;
  message: string;
  errors: { field: string; message: string }[];
  data?: {
    page: number;
    limit: number;
    totalJobs: number;
    totalPages: number;
    jobs: Job[];
  };
}

const DashBoardContent = () => {
  const router = useRouter();
  const [username, setUserName] = useState<string>("");
  const [dateInfo, setDateInfo] = useState({ day: "", fullDate: "" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  // const [filters, setFilters] = useState<{
  //   jobType?: string;
  //   ApplicationStatus?: string;
  //   search?: string;
  //   sortBy?: string;
  //   order?: "asc" | "desc";
  // }>({});

  const updateDate = () => {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[today.getDay()];

    const fullDate = `${
      months[today.getMonth()]
    } ${today.getDate()} ${today.getFullYear()}`;

    setDateInfo({ day, fullDate });
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllJobs({ limit: 1000 });
      if (response.success && response.data) {
        setJobs(response.data.jobs); 
      }
    } catch (err) {
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserNameFromSessionStorage = sessionStorage.getItem("userName");
    if (getUserNameFromSessionStorage) {
      setUserName(getUserNameFromSessionStorage);
    }

    updateDate();
    fetchJobs();
    const interval = setInterval(updateDate, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="px-7 pt-3 rounded-tr-[20px] bg-[#f3f3f3]">
        <p className="text-[#07090b] font-bold capitalize">Dashboard</p>
      </div>

      <div className="bg-[#fff] mt-3 m-5 h-[500px] rounded-[20px] px-2 shadow">
        <div className="flex justify-between mt-2">
          {username ? (
            <p className="text-[16px] font-bold capitalize px-2">
              welcome, {username}!{" "}
            </p>
          ) : (
            <p className="text-[px] font-bold capitalize px-2">
              hello, welcome!
            </p>
          )}

          <p className="text-[15px] px-2 text-[#07090b]  ">
            {dateInfo.day}, {dateInfo.fullDate}
          </p>
        </div>

        <div className="flex flex-col h-[400px] border-yellow-800 border">
          <div className="bg-white h-[300px] rounded py-4 px-2">
            <p className="flex gap-x-2 items-center">
              <FileUser className="w-4 h-4" />
              <span className="capitalize font-bold">my applications</span>
            </p>

            {loading ? (
              <div className="flex w-fit m-auto mt-20 font-semibold items-center gap-x-2">
                <ClipLoader size={18} color={"#07090b"} />
                <p className="text-[#07090b]">Loading Jobs....</p>
              </div>
            ) : error ? (
              <p className="text-red-500 font-semibold w-fit m-auto mt-20">
                {error}
              </p>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col">
                <p className="text-[#07090b] font-semibold w-fit m-auto mt-20">
                  No jobs found.
                </p>
                <Link
                  href="/dashboard/createJob"
                  className="capitalize w-fit m-auto mt-2 text-white bg-[#07090b] px-2 rounded py-1"
                >
                  Create job
                </Link>
              </div>
            ) : (
              <div className="mt-3 mx-2 border-2">
                <DataTable
                  columns={columns}
                  data={jobs}
                  // pageCount={totalPages}
                  // pageIndex={page}
                  // setPageIndex={setPage}
                  // setFilters={setFilters}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardContent;

{
  /* {loading && (
              <div className="flex w-fit m-auto mt-20 font-semibold items-center gap-x-2">
                <ClipLoader size={18} color={"#"} /> 
                <p className="text-[#07090b]">Loading Jobs....</p>
              </div>
            )}

            {error && (
              <p className="text-red-500 font-semibold w-fit m-auto mt-20 ">{error}</p>
            )}
            {!loading && jobs.length === 0 && !error && (
              <div className="flex flex-col">
                <p className="text-[#07090b] font-semibold w-fit m-auto mt-20 ">No jobs found.</p>
                <Link  
                  href="/dashboard/createJob" 
                  className="capitalize  w-fit m-auto mt-2 text-[#686868] bg-[#07090b] px-2 rounded py-1">create job
                </Link>
              </div>
            )}
            {loading && jobs.length > 0 && (
              <div>

              </div>
            )} */
}
