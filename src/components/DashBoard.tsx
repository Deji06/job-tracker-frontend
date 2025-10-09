"use client";
import { useEffect, useState } from "react";
import { FileUser, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { getAllJobs } from "@/app/dashboardAction";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

// import dayjs from "dayjs";

interface Job {
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
  const [username, setUserName] = useState<string>("");
  const [dateInfo, setDateInfo] = useState({ day: "", fullDate: "" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  // time and date function
  // const updateDate = () => {
  //   const today = dayjs();
  //   setDateInfo({
  //     day: today.format("dddd"),
  //     fullDate: today.format("MMM D YYYY"),
  //   });
  // };

  const fetchJobs = async (pageNum: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllJobs({ page: pageNum, limit: 10 });
      if (response.success && response.data) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
        setPage(response.data.page);
      } else {
        setError(response.message);
        response.errors.forEach((err) =>
          toast.error(`${err.field}: ${err.message}`)
        );
      }
    } catch (error) {
      setError("Failed to fetch jobs. Please try again.");
      toast.error("Failed to fetch jobs. Please try again.", {
        duration: 5000,
      });
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
    fetchJobs(page);
    const interval = setInterval(updateDate, 60 * 1000);
    return () => clearInterval(interval);

    // Update every minute to catch midnight change
    // const interval = setInterval(updateDate, 60 * 1000);

    // // Cleanup interval when component unmounts
    // return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex px-7 pt-3 rounded-tr-[20px] justify-between bg-[#f3f3f3]">
        <p className="text-[#07090b] font-bold capitalize">Dashboard</p>
        <form action="">
          <input type="text" className="border" />
        </form>
      </div>

      <div className="bg-[#fff] mt-3 m-5 flex-1 rounded-[20px] px-2 shadow">
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

        <div className="flex flex-col">
          <div className="bg-white rounded py-4 px-2">
            <p className="flex gap-x-2 items-center">
              <FileUser className="w-4 h-4" />
              <span className="capitalize font-bold">my applications</span>
            </p>
            {/* Headings Row */}
            <div className="flex justify-between border-b bg-[#f3f3f3] py-1 pb-2 text-[#686868] font-semibold text-sm mt-3 mx-2">
              <p className="w-[20%]">Job Title</p>
              <p className="w-[20%]">Company</p>
              <p className="w-[15%]">Job Type</p>
              <p className="w-[15%]">Status</p>
              <p className="w-[15%]">Applied Date</p>
              <p className="w-[15%] text-center">Actions</p>
            </div>

            {/* Job Rows */}
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
                  create job
                </Link>
              </div>
            ) : (
              <div className="flex flex-col divide-y w-[100%] mx-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex justify-between items-center py-3 text-sm text-[#07090b] mx-2"
                  >
                    <p className="w-[20%] font-medium capitalize ">{job.title}</p>
                    <p className="w-[20%] capitalize">{job.company}</p>
                    <p className="w-[15%] lowercase">{job.jobType}</p>
                    <p
                      className={`w-fit font-semibold  ${
                        job.status === "APPLIED"
                          ? "text-yellow-800 bg-yellow-100 border border-yellow-300 lowercase rounded px-2"
                          : job.status === "INTERVIEW"
                          ? "text-blue-800 bg-blue-100 border-blue-300 rounded px-2"
                          : job.status === "OFFERED"
                          ? "text-green-800 bg-green-100 border-green-300 rounded px-2"
                          : "text-red-800 bg-red-100 border-red-300 rounded px-2"
                      }`}
                    >
                      {job.status}
                    </p>
                    <p className="w-[15%]">
                       {new Date(job.appliedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {/* {job.appliedDate} */}
                     </p>
                    <div className="w-[15%] flex justify-center gap-x-3">
                      <button className="text-blue-600 hover:underline cursor-pointer">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:underline cursor-pointer">
                        <Trash className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                ))}
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
