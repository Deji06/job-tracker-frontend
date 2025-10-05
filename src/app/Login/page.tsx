"use client";
import React, { useEffect, useState } from "react";
import { Mail, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { login } from "@/action";
import { useActionState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  interface FormState {
    success: boolean;
    message: string;
    errors: { field: string; message: string }[];
    user? : string
  }
  const initialState: FormState = {
    success: false,
    message: "",
    errors: [],
  };

  // states
  const [eye, setEye] = useState<boolean>(false);
  const [state, formAction] = useActionState(login, initialState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEye = () => {
    setEye(!eye);
  };

  // submission button
  const SubmitButton = React.memo(() => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="bg-[#181818] text-white rounded-[5px] p-2 cursor-pointer"
        disabled={pending}
      >
        {pending ? <ClipLoader size={18} color={"#ffffff"} /> : "sign in"}
      </button>
    );
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success && state.user) {
      toast.success("login successful! Redirecting to dashboard...") 
      sessionStorage.setItem('userName', state.user)
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }, [state.success, router]);

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

      <div className="bg-[#f3f3f3] w-[80%] m-auto mt-10 h-fit flex justify-between p-10 rounded-[10px] mb-5">
        {/* left */}
        <div className="w-[35%] px-5 mt-[80px] h-fit mx-14">
          <p>job tracker</p>
          <h2 className="font-bold text-[30px] text-[#181818] mt-3">sign in</h2>

          <form action={formAction} className="flex flex-col mt-4 gap-y-5">
            <div className="">
              <label
                htmlFor="email"
                className="font-bold capitalize text-[14px] text-[#181818]"
              >
                email address
              </label>
              <div className="flex items-center border-none rounded-[5px] p-1 gap-x-3 px-2 bg-white mt-1">
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
              {state.errors.find((e) => e.field === "email") && (
                <p className="text-red-500 text-[12px]">
                  {state.errors.find((e) => e.field === "email")?.message}
                </p>
              )}
            </div>

            <div className="">
              <label
                htmlFor=""
                className="font-bold capitalize text-[14px] text-[#181818]"
              >
                password
              </label>
              <div className="flex items-center border-none rounded-[5px] p-1 gap-x-3 px-2 bg-white mt-1">
                {eye ? (
                  <EyeOff onClick={handleEye} className="w-4 h-4" />
                ) : (
                  <Eye onClick={handleEye} className="w-4 h-4" />
                )}
                <input
                  type={eye ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Min, 8 characters"
                  className="border-none outline-none placeholder:text-[14px] text-[12px] py-1 text-[#181818] w-[100%]  "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {state.errors.find((e) => e.field === "password") && (
                <p className="text-red-500 text-[12px]">
                  {state.errors.find((e) => e.field === "password")?.message}
                </p>
              )}
            </div>
            {state.message && !state.success && (
              <p className="text-red-500 text-[12px] text-center">
                {state.message}
              </p>
            )}

            {/* {state.success && state.message && (
            <p className="text-green-500 text-[12px] text-center">{state.message}</p>
          )} */}
            <div className="flex items-center gap-x-3">
              <input type="checkbox" id="remember" />
              <label className="font-bold text-[14px]" htmlFor="remember">
                Remember me
              </label>
            </div>
            <SubmitButton />
          </form>
          <p className="text-[#616161] flex gap-x-2 items-center">
            Don't have an account? <Link href={"/SignUp"}>Sign up</Link>
          </p>
          <Link href={'/ForgetPassword'} className="text-[#181818] capitalize">forgot password?</Link>
        </div>
        {/* right */}
        <div
          className="mr-3"
          style={{
            backgroundImage: "url('/bg1.jpg')",
            backgroundSize: "cover",
            width: "50%",
            height: "600px",
            borderRadius: "20px",
          }}
        >
          <div className="text-white text-[14px] borde rounded-[10px] space-y-3 mt-[100px] mx-5 px-2 bg-blac py-10">
            <div className="px-5">
              <p className="capitalize text-[16px] font-bold">job tracker</p>
              <p className="text-[20px] font-bold capitalize mt-2">
                Welcome to Job Tracker
              </p>
              <p className="text-[#f0f0f0]">
                Tired of digging through emails to remember if you applied for a
                job? With Job Tracker, you can easily monitor and manage all
                your job applications in one place.
              </p>
              <p className="text-[#f0f0f0] mt-2">
                It’s your turn to take control — join us today.
              </p>
            </div>
          </div>

          <div className="relative text-white text-[14px] rounded-[10px] space-y-3 mt-[0px] mx-5 px-2 bg-[#686868] py-5">
            <p className="text-[20px] font-bold capitalize">
              track your job application
            </p>
            <p>
              be among the first founders to experience the easiest way to track
              your job applications
            </p>
            <p>Now it is your turn to join us</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
