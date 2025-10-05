import React from 'react'


const CreateJobContent = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow">
  <h2 className="text-xl font-semibold mb-6">Add New Job</h2>
  
  <form className="space-y-4">
    {/* Company and Title */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Company*</label>
        <input type="text" className="w-full border rounded-md p-2" placeholder="e.g. Google" />
      </div>
      <div>
        <label className="block text-sm font-medium">Job Title*</label>
        <input type="text" className="w-full border rounded-md p-2" placeholder="Frontend Developer" />
      </div>
    </div>

    {/* Location, Job Type, Status */}
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input type="text" className="w-full border rounded-md p-2" placeholder="Remote / Lagos" />
      </div>
      <div>
        <label className="block text-sm font-medium">Job Type*</label>
        <select className="w-full border rounded-md p-2">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select className="w-full border rounded-md p-2">
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Saved</option>
        </select>
      </div>
    </div>

    {/* Applied Date, Link */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Applied Date</label>
        <input type="date" className="w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Job Link</label>
        <input type="url" className="w-full border rounded-md p-2" placeholder="https://..." />
      </div>
    </div>

    {/* Notes */}
    <div>
      <label className="block text-sm font-medium">Notes</label>
      <textarea className="w-full border rounded-md p-2" rows={3} placeholder="e.g. Reached out to recruiter..."></textarea>
    </div>

    {/* Submit */}
    <div className="flex justify-end mt-6">
      <button type="submit" className="bg-[#181818] text-white px-6 py-2 rounded-md hover:bg-gray-800">
        Add Job
      </button>
    </div>
  </form>
</div>

  )
}

export default CreateJobContent