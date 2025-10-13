'use client'
import { SideBar } from "@/components/SideBar";
import { LogOut } from "lucide-react";
import { logout } from "@/action";
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast'

export default function dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = async() => {
     await logout()
    //  toast.loading('logging out...')
     router.push('/Login')
  }
  return (
    <div className="rounded-[20px] m-5 min-h-screen bg-[#f3f3f3] flex flex-col">
      <div className="rounded-[20px] flex my-7 mx-2 h-[500px]">
        {/* Left Sidebar */}
        <div className="w-[25%] shadow px-7 pt-3  rounded-tl-[20px] rounded-bl-[20px] bg-[#07090b] space-y-3">
          <p className="font-bold text-[20px] text-white capitalize mt-1">
            job tracker
          </p>
          <div className="border w-[100%]  border-[#686868]"></div>
          <SideBar />
          
          <button 
            type="button"
            className="flex gap-x-2 items-center py-2 rounded text-gray-300 hover:text-white hover:bg-[#1a1d21] px-2 mt-[200px] ml-2 cursor-pointer w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 border-none" />
            <p className="border-none">Logout</p>
          </button>
        </div>

        {/* Right Content */}
        <div className="w-[75%] shadow  rounded-tr-[20px] rounded-br-[20px] flex flex-col flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
