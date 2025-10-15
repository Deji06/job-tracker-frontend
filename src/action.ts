"use server";
import {
  registerationSchema,
  loginSchema,
  resetPasswordSchema,
  forget_password_Schema,
} from "./validation";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface FormState {
  success: boolean;
  message: string;
  errors: { field: string; message: string }[];
  user?: string;
}

export async function signUp(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    const parsed = registerationSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "validation failed",
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path[0]?.toString(),
          message: issue.message,
        })),
      };
    }
    const url = process.env.NEXT_PUBLIC_API_URL;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!url) {
      throw new Error("no URL provided");
    }
    // console.log(url);
    const registerationResponse = await axios.post(
      `${url}/api/v1/auth/register`,
      parsed.data,
      config
    );

    console.log("success:", registerationResponse.data);
    revalidatePath("/Login");
    return {
      success: true,
      message: registerationResponse.data.msg || "Registeration successful",
      errors: [],
    };
  } catch (error: any) {
    console.error("signup error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data.msg,
      status: error.response?.status,
    });
    let errorMessage = "registeration failed";
    let errorField = "unknown";
    if (error.code === "ERR_INTERNET_DISCONNECTED") {
      errorMessage =
        "Failed to connect with sever, check internet connection!!";
    } else if (error.response && error.response.status === 404) {
      errorMessage = "something went wrong, try later !!";
    } else if (error.response && error.response.data?.msg) {
      errorMessage = error.response.data.msg;
    } else if (typeof error.response === "string") {
      errorMessage = error.response;
    } else {
      errorMessage = "Registration Failed, please try later";
    }

    return {
      message: errorMessage,
      errors: [{ field: errorField, message: errorMessage }],
      success: false,
    };
  }
}

// login
export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "validation failed",
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path[0]?.toString(),
          message: issue.message,
        })),
      };
    }
    const url = process.env.NEXT_PUBLIC_API_URL;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!url) {
      throw new Error("no URL provided");
    }

    const loginResponse = await axios.post(
      `${url}/api/v1/auth/login`,
      parsed.data,
      config
    );
    // console.log("success:", loginResponse.data);
    const token = loginResponse.data.token;
    const loginToken = await cookies();
    loginToken.set("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // console.log(token);
    revalidatePath("/Dashboard");

    return {
      success: true,
      message: loginResponse.data.msg || "login successful",
      errors: [],
      user: loginResponse.data.name,
    };
  } catch (error: any) {
    console.error("login error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data.msg,
      status: error.response?.status,
    });
    let errorMessage = "login failed";
    let errorField = "unknown";
    if (error.code === "ERR_INTERNET_DISCONNECTED") {
      errorMessage =
        "Failed to connect with sever, check internet connection!!";
    } else if (error.response && error.response.status === 404) {
      errorMessage = "something went wrong, try later !!";
    } else if (error.response && error.response.data?.msg) {
      errorMessage = error.response.data.msg;
    } else if (typeof error.response === "string") {
      errorMessage = error.response;
    } else {
      errorMessage = "login Failed, please try later";
    }

    return {
      message: errorMessage,
      errors: [{ field: errorField, message: errorMessage }],
      success: false,
    };
  }
}

export async function logout() {
  (await cookies()).delete("authToken"), revalidatePath("/LogIn");
}

export async function forgetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = {
      email: formData.get("email")?.toString() || "",
    };
    const parsed = forget_password_Schema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "validation failed",
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path[0]?.toString(),
          message: issue.message,
        })),
      };
    }
    const url = process.env.NEXT_PUBLIC_API_URL;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!url) {
      throw new Error("no URL provided");
    }

    const response = await axios.post(`${url}/api/v1/auth/forget_password`, parsed.data, config)
    console.log(response.data.msg);
     return {
      success: true,
      message: response.data.msg || "email sent successfully",
      errors: [],
    };
    
  } catch (error: any) {
    console.error("forgetPassword error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data.msg,
      status: error.response?.status,
    });
    let errorMessage = "email failed to send, try again later!";
    let errorField = "unknown";
    if (error.code === "ERR_INTERNET_DISCONNECTED") {
      errorMessage =
        "Failed to connect with sever, check internet connection!!";
    } else if (error.response && error.response.status === 404) {
      errorMessage = "endpoint not found";
    } else if (error.response.status === 400 && error.response.data.msg) {
      errorMessage = error.response.data.msg;
      errorField = error.response.data.field || "email";
    } else if (error.response?.status === 500) {
      errorMessage = "Server error on backend—check logs or try later";
    } else {
      errorMessage = "forget password Failed, please try later";
    }

    return {
      message: errorMessage,
      errors: [{ field: errorField, message: errorMessage }],
      success: false,
    };
  }
}
