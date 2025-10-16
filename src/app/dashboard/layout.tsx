'use client'
import { SideBar } from "@/components/SideBar";
import { LogOut } from "lucide-react";
import { logout } from "@/action";
import { useRouter } from "next/navigation";
import {PanelRightOpen } from 'lucide-react';
// import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useState } from "react";

export default function dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const[openSideBar, setIsOpenSideBar] = useState(false)

  const handleMenu = () => {
    setIsOpenSideBar(!openSideBar)
  }

  const handleLogout = async() => {
     await logout()
     router.push('/Login')
  }
  return (
    <div className="md:rounded-[20px] md:m-5 min-h-screen bg-[#f3f3f3] flex flex-col ">
      <div className="md:rounded-[20px] flex my-7 mx-2 h-screen flex-1">
        {/* Left Sidebar desktop version */}
          <div className="w-[25%] hidden md:flex flex-col shadow px-7 pt-3  rounded-tl-[20px] rounded-bl-[20px] bg-[#07090b] space-y-3">
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
          {/* mobile version with sidebar overlay */}
          {openSideBar && (
            <div className="fixed inset-0 bg-black/40 z-10 md:hidden" onClick={handleMenu}>
              <div 
              className="w-[70%] fixed left-0 top-0 bottom-0 shadow px-7 pt-3 z-20 rounded-tr-[20px] rounded-br-[20px] bg-[#07090b] space-y-3 transition-transform duration-300 flex flex-col justify-between">
               <div>
                <div className="flex flex-col gap-y-3">
                  <p className="font-bold text-[20px] text-white capitalize mt-1">job tracker</p>
                  <div className="border border-[#686868]" />
                </div>
                  <SideBar />
               </div>
                <button
                  type="button"
                  className="flex gap-x-2 items-center py-2 rounded text-gray-300 hover:text-white hover:bg-[#1a1d21] px-2 ml-2 cursor-pointer w-full mb-5"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <p>Logout</p>
                </button>
              </div>
          </div>

          )}
  
        {/* Right Content */}
        <div className="w-[75%] shadow md:rounded-tr-[20px] md:rounded-br-[20px] flex flex-col flex-1 z-0">
          <PanelRightOpen  onClick={handleMenu} className="md:hidden flex m-5 w-8 h-8"  />
          {children}
        </div>
      </div>
    </div>
  );
}
