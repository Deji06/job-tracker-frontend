"use client";
import { useEffect, useState } from "react";
import {FileUser} from 'lucide-react'
import dayjs from "dayjs";
const DashBoardContent = () => {
  const [username, setUserName] = useState<string>("");
  const [dateInfo, setDateInfo] = useState({ day: "", fullDate: "" });

   const updateDate = () => {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = days[today.getDay()];
    const fullDate = `${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;

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

  useEffect(() => {
    const getUserNameFromSessionStorage = sessionStorage.getItem("userName");
    if (getUserNameFromSessionStorage) {
      setUserName(getUserNameFromSessionStorage);
    }

    updateDate();
    const interval = setInterval(updateDate, 60 * 1000);
    return () => clearInterval(interval);
    // Update every minute to catch midnight change
    // const interval = setInterval(updateDate, 60 * 1000);

    // // Cleanup interval when component unmounts
    // return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="px-7 pt-9 flex justify-between">
        <p className="font-bold text-[20px]">Dashboard</p>
        <form action="">
          <input type="text" className="border" />
        </form>
      </div>
      <div className="bg-[#f3f3f3]  flex-1 rounded-br-[20px] p-7">
        {username ? (
          <p className="text-[24px] font-bold capitalize px-2">
            welcome, {username}!{" "}
          </p>
        ) : (
          <p className="text-[22px] font-bold capitalize px-2">hello, welcome!</p>
        )}

        <p className="text-[15px] px-2 ">
          {dateInfo.day}, {dateInfo.fullDate}
        </p>

        <div className="flex flex-col mt-3">
          <div className="bg-white rounded py-4 px-2">
            <p 
              className="flex gap-x-2 items-center">
              <FileUser className="w-4 h-4"/>
              <span className="capitalize font-bold">my applications</span>
            </p>

          </div>
        </div>


      </div>
    </>
  );
};

export default DashBoardContent;
