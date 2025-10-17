"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signUp } from "@/action";
import { useActionState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormStatus } from "react-dom";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import box from "../../../public/signIn_Box.png";
import potrait1 from "../../../public/laptop-4906312_1280.jpg";
import potrait2 from "../../../public/man-2562325_1280.jpg";
import potrait3 from "../../../public/portrait-5115892_1280.jpg";

const SignUp = () => {
  interface FormState {
    success: boolean;
    message: string;
    errors: { field: string; message: string }[];
  }
  const initialState: FormState = {
    success: false,
    message: "",
    errors: [],
  };

  // states
  const [eye, setEye] = useState<boolean>(false);
  const [state, formAction] = useActionState(signUp, initialState);
  const [name, setName] = useState<string>("");
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
        {pending ? <ClipLoader size={18} color={"#ffffff"} /> : "sign up"}
      </button>
    );
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/Login");
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

      <div className="bg-[#f3f3f3] lg:w-[80%] mx-auto lg:mt-10 h-fit flex flex-col md:flex-row justify-between md:items-start p-6 md:p-10 md:rounded-[10px] shadow-sm">
        {/* left */}
        <div className="md:w-[35%] w-full px-3 md:px-5 md:mt-[70px] lg:mx-14 space-y-5 md:space-y-0">
          <p>job tracker</p>
          <h2 className="font-bold text-[30px] text-[#181818] mt-3">sign up</h2>

          <form
            action={formAction}
            className="flex flex-col mt-4 gap-y-5 w-full"
          >
            <div className="">
              <label
                htmlFor="name"
                className="font-bold capitalize text-[14px] text-[#181818]"
              >
                name
              </label>
              <div className="flex items-center border-none rounded-[5px] p-1 gap-x-3 px-2 bg-white mt-1">
                <User className="w-4 h-4" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="john doe"
                  onChange={(e) => setName(e.target.value)}
                  className="border-none outline-none placeholder:text-[14px] py-1 text-[12px] w-[100%]"
                />
              </div>
              {state.errors.find((e) => e.field === "name") && (
                <p className="text-red-500 text-[12px]">
                  {state.errors.find((e) => e.field === "name")?.message}
                </p>
              )}
            </div>

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
            {/* <div className="flex items-center gap-x-3">
            <input type="checkbox" id="remember" />
            <label className="font-bold text-[14px]" htmlFor="remember">
              Remember me
            </label>
          </div> */}
            <SubmitButton />
          </form>
          <p className="text-[#616161] flex gap-x-2 items-center">
            Already signed up? <Link href={"/Login"}>Sign in</Link>
          </p>
        </div>

        {/* right side */}
        <div
          className="w-full md:w-[60%] mt-10  rounded-[20px] h-[300px] md:h-[600px] flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg1.jpg')",
          }}
        >
          <div className="text-white text-[14px] rounded-[20px] space-y-3 lg:mt-[80px] lg:m-10 md:m-5 px-2 bg-black opacity-80 md:bg-none md:py-10 m-3">
            <div className="px-5">
              <p className="capitalize text-[16px] font-bold pt-2 sm:pt-0">job tracker</p>
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

          <div className="relative text-white text-[14px] bg-cover w-[100%] opacity-100 h-[200px] md:mx-10 mx-5 hidden md:flex">
            <Image
              src={box}
              alt="image"
              className="md:w-[85%] w-[90%] absolute md:top-0 top-14"
            />

            <div className="flex flex-col w-[80%] absolute top-[65px] md:top-7 gap-y-2 lg:gap-y-8 md:gap-y-2 px-2 md:px-5">
              <p className="lg:text-[20px] font-bold capitalize">
                track your job application
              </p>
              <p className="text-white">
                Be among the first founders to experience the easiest way to
                track your job applications
              </p>
              <p className="">Now it is your turn to join us</p>
            </div>

            <div className="absolute lg:right-[90px] right-10 lg:bottom-5 md:bottom-14 md:right-12 bottom-0 flex -space-x-3">
              <Image
                src={potrait1}
                alt="human picture"
                className="w-8 h-8 rounded-full bg-white/60 border border-white"
              />
              <Image
                src={potrait2}
                alt="human picture"
                className="w-8 h-8 rounded-full bg-white/60 border border-white"
              />
              <Image
                src={potrait3}
                alt="human picture"
                className="w-8 h-8 rounded-full bg-white/60 border border-white"
              />
              <div className="w-8 h-8 rounded-full bg-black/60 border border-white m-auto p-1 text-[12px] ">
                {" "}
                +2
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
