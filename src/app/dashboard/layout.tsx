'use client'
import { SideBar } from "@/components/SideBar";
import { LogOut } from "lucide-react";
import { logout } from "@/action";
import { useRouter } from "next/navigation";
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
// import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

export default function dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const[openSideBar, setIsOpenSideBar] = useState(true)

  const handleMenu = () => {
    setIsOpenSideBar(!openSideBar)
  }

  const handleLogout = async() => {
     await logout()
     router.push('/Login')
  }
  return (
    <div className="relative md:rounded-[20px] md:m-5 min-h-screen bg-[#f3f3f3] flex flex-col overflow-hidden ">
      <div className="md:rounded-[20px] flex my-7 mx-2 min-h-[700px] mb-10 md:mb-0 md:h-[500px]">
        {/* Left Sidebar */}
        {openSideBar ? 
          <div className="md:w-[25%] shadow px-7 pt-3  rounded-tl-[20px] rounded-bl-[20px] bg-[#07090b] space-y-3">
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
      : ''}
      
        

        {/* Right Content */}
        <div className="w-[75%] shadow  rounded-tr-[20px] rounded-br-[20px] flex flex-col flex-1">
          <PanelRightClose  onClick={handleMenu} className="m-5"  />
          {children}
        </div>
      </div>
    </div>
  );
}
