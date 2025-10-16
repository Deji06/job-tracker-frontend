"use client";
import React, { useEffect, useState } from "react";
import { Mail, Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import { login } from "@/action";
import { useActionState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import box from '../../../public/signIn_Box.png'
import potrait1 from '../../../public/laptop-4906312_1280.jpg'
import potrait2 from '../../../public/man-2562325_1280.jpg'
import potrait3 from '../../../public/portrait-5115892_1280.jpg'
// import potrait4 from '../../../public/WhatsApp Image 2024-12-04 at 15.34.33_b545206f.jpg'

const Login = () => {
  interface FormState {
    success: boolean;
    message: string;
    errors: { field: string; message: string }[];
    user?: string;
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
      toast.success("login successful! Redirecting to dashboard...");
      sessionStorage.setItem("userName", state.user);
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

      <div className="bg-[#f3f3f3] lg:w-[80%] m-auto lg:mt-10 h-screen lg:h-fit md:flex md:justify-between md:p-10 p-6 md:rounded-[10px] md:mb-5">
        {/* left */}
        <div className="lg:w-[35%]  px-5 md:mt-[70px] pt-20 md:pt-0 h-fit md:mx-14">
          <p className="text-black font-semibold">job tracker</p>
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
          <p className="md:text-[#616161] flex gap-x-2 items-center mt-3 md:mt-0">
            Don't have an account?{" "}
            <Link href={"/SignUp"} className=" text-[14px]">
              Sign Up
            </Link>
          </p>
          <Link href={"/ForgetPassword"} className="text-[#181818] capitalize">
            forgot password?
          </Link>
        </div>

        {/* right */}
        <div
          className="w-full md:w-[60%] mt-10  rounded-[20px] h-[300px] md:h-[600px] flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg1.jpg')",
           
          }}
        >
          <div className="text-white text-[14px] rounded-[20px] space-y-3 md:mt-[80px] mt-10 lg:m-10 m-10 md:m-5 px-2 bg-black opacity-80 md:bg-none py-10 hidden md:flex">
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

          <div className="relative text-white text-[14px] bg-cover w-[100%] opacity-100 h-[200px] md:mx-10 mx-5">
            <Image src={box} alt="image" className="md:w-[85%] w-[90%] absolute md:top-0 top-14"/>

            <div className="flex flex-col w-[80%] absolute top-[65px] md:top-7 gap-y-4 lg:gap-y-8 md:gap-y-2 px-2 md:px-5">
              <p className="lg:text-[20px] font-bold capitalize">
                track your job application
              </p>
              <p className="text-white">
                Be among the first founders to experience the easiest way to track
                your job applications
              </p>
              <p className="">Now it is your turn to join us</p>
            </div>

            <div className="absolute lg:right-[90px] right-10 lg:bottom-5 md:bottom-14 md:right-12 bottom-0 flex -space-x-3">
              <Image src={potrait1} alt="human picture"  className="w-8 h-8 rounded-full bg-white/60 border border-white"/>
              <Image src={potrait2} alt="human picture"  className="w-8 h-8 rounded-full bg-white/60 border border-white"/>
              <Image src={potrait3} alt="human picture"  className="w-8 h-8 rounded-full bg-white/60 border border-white"/>
              <div className="w-8 h-8 rounded-full bg-black/60 border border-white m-auto p-1 text-[12px] "> +2</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
