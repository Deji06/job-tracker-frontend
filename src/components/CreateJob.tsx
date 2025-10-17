"use client";
import { createJob } from "@/app/dashboardAction";
import React, { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const CreateJobContent = () => {
  interface formState {
    success: boolean;
    errors: { field: string; message: string }[];
    message: string;
  }

  const initialState: formState = {
    success: false,
    errors: [],
    message: "",
  };

  const [state, formAction] = useActionState(createJob, initialState);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    jobType: "",
    status: "",
    appliedDate: "",
    link: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (state.success) {
      toast.success("Job created! Check dashboard...");
      setTimeout(() => {
        setFormData({
          company: "",
          title: "",
          location: "",
          jobType: "",
          status: "",
          appliedDate: "",
          link: "",
          notes: "",
        });
      }, 3000);
    } else if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(`${error.field}: ${error.message}`, { duration: 5000 });
        if (
          error.message.includes("log in again") ||
          error.message.includes("Invalid token")
        ) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      });
    }
  }, [state]);

  const SubmitButton = React.memo(() => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="bg-[#181818] text-white rounded-[5px] p-2 cursor-pointer w-full sm:w-auto"
        disabled={pending}
        onClick={(e) => {
          if (pending) e.preventDefault();
        }}
      >
        {pending ? <ClipLoader size={18} color={"#ffffff"} /> : "Create Job"}
      </button>
    );
  });

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

      <p className="text-[#07090b] font-bold capitalize px-4 sm:px-7 pt-6 text-lg">
        Create job to track
      </p>

      <div className="bg-[#f3f3f3] mt-4 flex-1 rounded-br-[20px] p-4 sm:p-7 flex flex-col md:flex-row gap-6">
        {/* Left side*/}
        <div className="flex flex-col md:w-[30%] w-full">
          <p className="capitalize font-semibold text-lg text-[#07090b]">
            Job details
          </p>
          <p className="text-[#5d6165] text-sm mt-1">
            Manage and track all your job applications here. Fill in the
            required details to keep your progress organized.
          </p>
        </div>

        {/* Form */}
        <form
          action={formAction}
          className="md:w-[70%] w-full max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Job Title */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2"
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer"
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
            {state.errors.find((e) => e.field === "title") && (
              <p className="text-red-500 text-sm">
                {state.errors.find((e) => e.field === "title")?.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2"
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              name="company"
              onChange={handleChange}
              placeholder="e.g., Google"
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
            {state.errors.find((e) => e.field === "company") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "company")?.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="text-[#07090b] font-medium mb-1 capitalize"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              name="location"
              onChange={handleChange}
              placeholder="e.g., Lagos, Nigeria"
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label
              htmlFor="jobType"
              className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2"
            >
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              value={formData.jobType}
              name="jobType"
              onChange={handleChange}
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] text-sm"
            >
              <option value="">Select Job Type</option>
              <option value="HYBRID">Hybrid</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="REMOTE">Remote</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
              <option value="ENTRY_LEVEL">Entry Level</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-[#07090b] font-medium mb-1 capitalize"
            >
              Application Status
            </label>
            <select
              id="status"
              value={formData.status}
              name="status"
              onChange={handleChange}
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] text-sm"
            >
              <option value="">Select Status</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFERED">Offered</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Applied Date */}
          <div className="flex flex-col">
            <label
              htmlFor="appliedDate"
              className="text-[#07090b] font-medium mb-1 capitalize"
            >
              Date Applied
            </label>
            <input
              type="date"
              id="appliedDate"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] text-sm"
            />
          </div>

          {/* Job Link */}
          <div className="flex flex-col">
            <label
              htmlFor="link"
              className="text-[#07090b] font-medium mb-1 capitalize"
            >
              Job Link
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              name="link"
              onChange={handleChange}
              placeholder="e.g., https://company.com/job-posting"
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col sm:col-span-2">
            <label
              htmlFor="notes"
              className="text-[#07090b] font-medium mb-1 capitalize"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              name="notes"
              onChange={handleChange}
              rows={4}
              placeholder="Add any notes about this application..."
              className="bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] resize-none placeholder:text-sm text-sm"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateJobContent;
