// components/SideBar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BadgePlus, Search } from "lucide-react";

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-2 mt-7">
      <Link
        href="/dashboard"
        className={`flex items-center gap-x-3 p-2 rounded cursor-pointer
            ${
              pathname === "/dashboard"
                ? "bg-[#2a2d31] text-white"
                : "hover:bg-[#1a1d21] text-gray-300 hover:text-white"
            }`}
      >
        <LayoutDashboard className="w-4 h-4 text-white" />
        <span className="text-left text-white">Dashboard</span>
      </Link>

      <Link
        href="/dashboard/createJob"
        className={`flex items-center gap-x-3 p-2 rounded cursor-pointer
            ${
              pathname === "/dashboard/createJob"
                ? "bg-[#2a2d31] text-white"
                : "hover:bg-[#1a1d21] text-gray-300 hover:text-white"
            }`}
      >
        <BadgePlus className="w-4 h-4" />
        <span className="text-left capitalize">create job</span>
      </Link>

      <Link
        href="/dashboard/searchJob"
        className={`flex items-center gap-x-3 p-2 rounded cursor-pointer
            ${
              pathname === "/dashboard/searchJob"
                ? "bg-[#2a2d31] text-white"
                : "hover:bg-[#1a1d21] text-gray-300 hover:text-white"
            }`}
      >
        <Search className="w-4 h-4" />
        <span className="text-left capitalize"> search</span>
      </Link>

      {/* <Link href="/dashboard/search-job">
        <button
          className=`text-left p-2 rounded w-full ${
            pathname === "/dashboard/search-job" ? "bg-[#181818] text-white" : "hover:bg-gray-100"
          }`}
        >
          Search Job
        </button>
      </Link> */}
    </div>
  );
};
