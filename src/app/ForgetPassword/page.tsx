"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { MoveRight, Mail } from "lucide-react";
import { forgetPassword } from "@/action";
import { useFormStatus } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex bg-[#181818] text-white rounded-[5px] p-2 cursor-pointer mt-3 items-center text-center gap-x-3 justify-center w-[100%]"
      disabled={pending}
    >
      {pending ? (
        <ClipLoader size={18} color="#ffffff" />
      ) : (
        <>
          <span>send reset link</span>
          <MoveRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

const ForgetPassword = () => {
  interface FormState {
    success: boolean;
    message: string;
    errors: { field: string; message: string }[];
  }

  const initialState: FormState = {
    success: false,
    errors: [],
    message: "",
  };

  const [state, formAction] = useActionState(forgetPassword, initialState);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.success) {
      toast.success("email successfully sent to provided gmail address!");
      // setEmail('')
      setTimeout(() => {}, 3000);
    } else if (state.message && !state.success) {
      toast.error(state.message); // Display backend errors
    }
  }, [state]);
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
      <div className="bg-[#f3f3f3] h-screen">
        <div className="w-[50%] m-auto pt-[100px] space-y- borde px-5">
          <p className="text-center">job tracker</p>
          <div>
            <p className="text-center font-bold text-[24px] capitalize">
              forgot password ?
            </p>
            <p className="text-center text-[#686868] text-[14px] w-[70%] m-auto">
              Enter your email address and we will send you a link to reset your
              password
            </p>
          </div>
          <form
            action={formAction}
            className="w-[70%] m-auto  mt-2 borde px-5 "
          >
            <div className="">
              <label
                htmlFor="email"
                className="font-bold capitalize text-[14px] text-[#181818]"
              >
                your email
              </label>
              <div className="flex items-center border-none  rounded-[5px] p-1 gap-x-3 px-2 bg-white mt-1">
                <Mail className="w-4 h-4" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="johndoe@gmail.com"
                  className="border-none outline-none placeholder:text-[14px] py-1 text-[12px] w-[100%]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {state.message && (
                <p
                  className={`text-[14px] mt-2 ${
                    state.success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {state.message}
                </p>
              )}
              {/* {state.errors.find((e) => e.field === "email") && (
                <p className="text-red-500 text-[12px]">
                  {state.errors.find((e) => e.field === "email")?.message}
                </p>
              )} */}
            </div>
            <SubmitButton />
            {/* <div className="flex bg-[#181818] text-white rounded-[5px] p-2 cursor-pointer mt-3  items-center text-center gap-x-3 justify-center ">
            <button type="submit" className="border-none">send reset link</button>
            <MoveRight className="w-4 h-4" />
          </div> */}
          </form>
          <Link
            href="/Login"
            className="capitalize text-[14px] block w-fit m-auto mt-2 text-[#686868] "
          >
            back to sign in
          </Link>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
