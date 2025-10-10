"use client"
import { createJob } from '@/app/dashboardAction'
import React, {useActionState, useEffect, useState} from 'react'
import { useFormStatus } from 'react-dom';
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";


const CreateJobContent = () => {
  interface formState {
    success: boolean,
    errors: {field:string, message:string}[],
    message: string,
}

const initialState:formState = {
  success:false,
  errors:[],
  message: ''
}
  const [state, formAction] = useActionState(createJob, initialState)
  const [formData, setFormData] = useState({ company: "", title: "", location: "", jobType: "", status: "", appliedDate: "", link: "", notes: "",});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const{id, value} = e.target
     setFormData((prev) => ({ ...prev, [id]: value }));

  }

    useEffect(() => {
      console.log('Form state:', state);
      console.log('Form data:', formData);
      if (state.success) {
        toast.success("job created!check dashboard...") 
        setTimeout(() => {
        setFormData({company: "", title: "", location: "", jobType: "", status: "", appliedDate: "", link: "", notes: "", });
          }, 3000);
        } else if (state.errors.length > 0) {
          console.error('Form errors:', state.errors); // Log to browser console
          state.errors.forEach((error) => {
            toast.error(`${error.field}: ${error.message}`, { duration: 5000 });
            if (error.message.includes('log in again') || error.message.includes('Invalid token')) {
              setTimeout(() => {
                window.location.href = '/login';
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
          className="bg-[#181818] text-white rounded-[5px] p-2 cursor-pointer"
          disabled={pending}
          onClick={(e) => {
           if(pending) e.preventDefault()
          }}
        >
          {pending ? <ClipLoader size={18} color={"#ffffff"} /> : "create job"}
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
      <p className='text-[#07090b] font-bold capitalize px-7 pt-8'>create job to track</p>

      <div className="bg-[#f3f3f3] mt- flex-1 rounded-br-[20px] p-7 flex justify-between">
        <div className='flex flex-col  w-[30%]'>
          <p className='capitalize font-semibold text-lg text-[#07090b]'>job details</p>
          <p className='text-[#5d6165] text-sm mt-1'>Manage and track all your job applications here. Fill in the required details to keep your progress organized.</p>
        </div>

        <form 
          action={formAction}
          className="w-[70%] max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mx-3 grid grid-cols-2">
  {/* job title */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="jobTitle" className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2">
              Job Title <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              id="title"
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer"
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />

            {state.errors.find((e)=>e.field === 'title') && (
              <p className='text-red-500 text-sm'>{state.errors.find((e)=>e.field === 'title')?.message}</p>
            )}
          </div>

 {/* Company */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="company" className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name='company'
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Google"
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
            {state.errors.find((e)=>e.field==='company') && (
              <p className='text-sm text-red-500'>{state.errors.find((e)=>e.field === 'company')?.message}</p>
            )}

          </div>

{/* Location */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="location" className="text-[#07090b] font-medium mb-1 capitalize">
              Location
            </label>
            <input
              type="text"
              id="location"
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Lagos, Nigeria"
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
            
              {state.errors.find((e)=>e.field==='location') && (
                <p className='text-sm text-red-500'>{state.errors.find((e)=>e.field === 'location')?.message}</p>
               )}
          </div>

{/* Job Type */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="jobType" className="text-[#07090b] font-medium mb-1 capitalize flex gap-x-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              name='jobType'
              value={formData.jobType}
              onChange={handleChange}
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            >
              <option value="">Select Job Type</option>
              <option value="HYBRID">Hybrid</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="REMOTE">Remote</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
              <option value="ENTRY_LEVEL">Entry Level</option>
            </select>

            {state.errors.find((e) => e.field === "jobType") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "jobType")?.message}
              </p>
            )}
          </div>

{/* Status */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="status" className="text-[#07090b] font-medium mb-1 capitalize">
              Application Status
            </label>
            <select
              id="status"
              name='status'
              value={formData.status}
              onChange={handleChange}
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            >
              <option value="">Select Status</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFERED">Offered</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {state.errors.find((e) => e.field === "status") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "status")?.message}
              </p>
            )}

          </div>

 {/* Applied Date */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="appliedDate" className="text-[#07090b] font-medium mb-1 capitalize">
              Date Applied
            </label>
            <input
              type="date"
              id="appliedDate"
              name='appliedDate'
              value={formData.appliedDate}
              onChange={handleChange}
              className="border-none bg-white rounded-md p-1 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />
            {state.errors.find((e) => e.field === "appliedDate") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "appliedDate")?.message}
              </p>
            )}
          </div>

{/* Job Link */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="link" className="text-[#07090b] font-medium mb-1 capitalize">
              Job Link
            </label>
            <input
              type="url"
              id="link"
              name='link'
              value={formData.link}
              onChange={handleChange}
              placeholder="e.g., https://company.com/job-posting"
              className="border-none bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] placeholder:text-sm text-sm"
            />

            {state.errors.find((e) => e.field === "link") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "link")?.message}
              </p>
            )}
          </div>

  {/* Notes */}
          <div className="flex flex-col mb-4 mx-2">
            <label htmlFor="notes" className="text-[#07090b] font-medium mb-1 capitalize">
              Notes
            </label>
            <textarea
              id="notes"
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add any notes about this application..."
              className="border-none bg-white rounded-md p-2 outline-none focus:ring-1 focus:ring-[#07090b] resize-none placeholder:text-sm text-sm"
            ></textarea>
            
            {state.errors.find((e) => e.field === "notes") && (
              <p className="text-sm text-red-500">
                {state.errors.find((e) => e.field === "notes")?.message}
              </p>
            )}
          </div>
          <SubmitButton />

          {/* <button type='submit' className="bg-[#07090b] text-white rounded-[5px] p-2 cursor-pointer">submit</button> */}

        </form>

      </div>

    
   
    </>

  )
}

export default CreateJobContent