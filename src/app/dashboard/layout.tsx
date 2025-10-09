import { SideBar } from "@/components/SideBar";

export default function dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] m-5 min-h-screen bg-[#f3f3f3] flex flex-col">
      <div className="rounded-[20px] flex my-7 mx-2 h-[500px] ">

        {/* Left Sidebar */}
        <div className="w-[25%] shadow px-7 pt-3  rounded-tl-[20px] rounded-bl-[20px] bg-[#07090b] space-y-3">
          <p className="font-bold text-[20px] text-white capitalize mt-1">job tracker</p>
          <div className="border w-[100%]  border-[#686868]"></div>
          <SideBar />
          <div>
            <p>logout</p>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-[75%] shadow  rounded-tr-[20px] rounded-br-[20px] h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}