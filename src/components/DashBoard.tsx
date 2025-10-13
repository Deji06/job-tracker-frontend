"use client";
import { useEffect, useState } from "react";
import { FileUser, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { getAllJobs } from "@/app/dashboardAction";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { columns, Job } from "@/app/dashboard/columns";
import { DataTable } from "@/app/dashboard/data-table";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/app/utils/errorHandler";
import EditJobModal from "./EditJob";
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
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // const [page, setPage] = useState<number>(1);
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

  // function to fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllJobs({ limit: 1000 });
      if (response.success && response.data) {
        setJobs(response.data.jobs);
        setTotalJobs(response.data?.totalJobs);
      } else {
        setError(response.message);
        response.errors.forEach((err) =>
          toast.error(`${err.field}: ${err.message}`)
        );
        if (
          response.message.toLowerCase().includes("session expired") ||
          response.message.toLowerCase().includes("invalid or expired token")
        ) {
          console.log("redirecting....");
          toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            router.push("/Login");
          }, 5000);
        }
      }
    } catch (err) {
      const handledError = handleApiError(error);

      setError(handledError.message);
      handledError.errors.forEach((err) => toast.error(err.message));

      // Redirect if session expired
      if (handledError.message.toLowerCase().includes("session expired")) {
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => router.push("/Login"), 3000);
      }

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

  // function to display modal and update Job
  const handleEditClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleJobUpdated = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    toast.success("Job updated successfully!");
    handleCloseModal();
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#cccdde",
            border: "1px solid #686868",
          },
        }}
      />
      <div className="flex flex-col h-full bg-[#f3f3f3] rounded-tr-[20px] rounded-br-[20px]">
        <div className="px-7 pt-3 rounded-tr-[20px]">
          <p className="text-[#07090b] font-bold capitalize">Dashboard</p>
        </div>

        <div className="flex flex-col flex-1 bg-white mt-3 m-5 rounded-[20px] px-2 shadow overflow-hidden">
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

          <div className="flex-1 overflow-y-auto mt-2 ">
            <div className="py-4 px-2">
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
                <div className="mt-1">
                  <DataTable
                    columns={columns(setJobs, handleEditClick)}
                    data={jobs}
                    totalJobs={totalJobs}
                    setJobs={setJobs}
                    // pageIndex={page}
                    // setPageIndex={setPage}
                    // setFilters={setFilters}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedJob && (
        <EditJobModal
          jobData={selectedJob}
          onClose={handleCloseModal}
          onJobUpdated={handleJobUpdated}
        />
      )}
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
