"use client";

import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateJob } from "@/app/dashboardAction";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { X } from "lucide-react";

interface FormState {
  success: boolean;
  errors: { field: string; message: string }[];
  message: string;
}

interface EditJobModalProps {
  jobData: {
    id: number;
    company: string;
    title: string;
    location: string;
    jobType: string;
    status: string;
    appliedDate: string;
    link?: string;
    notes?: string;
  };
  onClose: () => void;
  onJobUpdated?: (updatedJob: any) => void;
}

const EditJobModal: React.FC<EditJobModalProps> = ({
  jobData,
  onClose,
  onJobUpdated,
}) => {
  const initialState: FormState = { success: false, errors: [], message: "" };
  const [state, formAction] = useActionState(
    async (prev: FormState, formData: FormData) =>
      updateJob(prev, formData, jobData.id),
    initialState
  );

  const [formData, setFormData] = useState({
    company: jobData.company,
    title: jobData.title,
    location: jobData.location,
    jobType: jobData.jobType,
    status: jobData.status,
    appliedDate: jobData.appliedDate
      ? new Date(jobData.appliedDate).toISOString().split("T")[0] // ✅ convert to YYYY-MM-DD
    : "",
    link: jobData.link,
    notes: jobData.notes,
  });

  // Handle field change
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
      toast.success("Job updated successfully!");
      setTimeout(() => {
        onClose();
        onJobUpdated?.({ ...jobData, ...formData });
      }, 1500);
    } else if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(`${error.field}: ${error.message}`);
      });
    }
  }, [state]);

  // Submit button with loading state
  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="bg-[#181818] text-white px-8 py-2 rounded-md hover:bg-[#2a2a2a] transition-all disabled:opacity-60 cursor-pointer "
      >
        {pending ? <ClipLoader size={18} color="#ffffff" /> : "Update"}
      </button>
    );
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

      {/* Modal backdrop */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
        {/* container */}
        <div className="bg-[#f9f9f9] w-full max-w-2xl rounded-2xl shadow-lg p-6 relative animate-fadeIn">
            <div>
                <h2 className="text-xl font-semibold text-[#07090b] mb-4">
                    Edit Job Details
                </h2>
                <X onClick={onClose} 
                  className="absolute top-4 right-4 cursor-pointer hover:text-gray-600 transition border-2 rounded mr-2"
                  role="button"
                />
            </div>

          {/* Form */}
          <form
            action={formAction}
            className="max-h-[70vh] overflow-y-auto grid grid-cols-2 gap-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          >
            {[ 
              { id: "title", label: "Job Title", type: "text", required: true },
              { id: "company", label: "Company", type: "text", required: true },
              { id: "location", label: "Location", type: "text" },
              { id: "appliedDate", label: "Applied Date", type: "date" },
              { id: "link", label: "Job Link", type: "url" },
            ].map(({ id, label, type, required }) => (
              <div key={id} className="flex flex-col">
                <label
                  htmlFor={id}
                  className="text-[#07090b] font-medium mb-1 capitalize"
                >
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b]"
                />
                {state.errors.find((e) => e.field === id) && (
                  <p className="text-sm text-red-500">
                    {state.errors.find((e) => e.field === id)?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Job Type */}
            <div className="flex flex-col">
              <label className="text-[#07090b] font-medium mb-1 capitalize">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b]"
              >
                <option value="">Select Type</option>
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
              <label className="text-[#07090b] font-medium mb-1 capitalize">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b]"
              >
                <option value="">Select Status</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFERED">Offered</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Notes */}
            <div className="col-span-2 flex flex-col">
              <label className="text-[#07090b] font-medium mb-1 capitalize">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any notes about this application..."
                className="bg-white border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-3 mt-3">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditJobModal;
