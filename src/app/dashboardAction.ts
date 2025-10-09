"use server"
import { jobSchema } from "@/validation";
import axios from "axios";
import { cookies } from "next/headers";
// import jwt  from 'jsonwebtoken'
interface formState {
    success: boolean,
    errors: {field:string, message:string}[],
    message: string,
}

interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  jobType: string;
  status: string;
  appliedDate: string;
  link?: string;
  notes?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface GetJobsResponse {
  success: boolean;
  message: string;
  errors: { field: string; message: string }[];
  data?: {
    page: number;
    limit: number;
    totalJobs: number;
    totalPages: number;
    jobs: Job[];
  };
}

interface GetJobsParams {
  page?: number;
  limit?: number;
  jobType?: string;
  ApplicationStatus?: string;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}  


export async function createJob(
    prevState: formState,
    formData:FormData
): Promise<formState> {
    try {
        const appliedDateRaw = formData.get("appliedDate")?.toString();
        if (!appliedDateRaw) {
        return {
            success: false,
            errors: [{ field: "appliedDate", message: "Invalid or missing date" }],
            message: "Invalid or missing date",
        };
        }
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(appliedDateRaw) || isNaN(Date.parse(appliedDateRaw))) {
        return {
            success: false,
            errors: [{ field: "appliedDate", message: "Invalid date format (use YYYY-MM-DD)" }],
            message: "Invalid date format",
        };
        }
        const data = {
            company: formData.get('company')?.toString() || "", 
            title: formData.get('title')?.toString() || "",
            location:formData.get('location')?.toString() || "",
            jobType: formData.get("jobType")?.toString() || "",
            status: formData.get("status")?.toString() || "",
            appliedDate: appliedDateRaw,
            link: formData.get("link")?.toString() || "",
            notes: formData.get("notes")?.toString() || "",
        }
        // console.log('FormData received:', data);
        const parsed = jobSchema.safeParse(data)
        if(!parsed.success) {
            return {
            success: false,
            message: "Validation failed",
            errors: parsed.error.issues.map((issue) => ({
            field: issue.path[0]?.toString(),
            message: issue.message,
         })),
            }
        }

        const url = process.env.NEXT_PUBLIC_API_URL;
        if(!url) {
            throw new Error("no URL provided")
        }
        const token = (await cookies()).get('authToken')?.value
        console.log('authToken', token);
        
        if(!token) {
            throw new Error('token not provided, please login !')
        }

        // let userId;
        // const secret = process.env.JWT_SECRET
        // if (!secret) {
        //     console.error("JWT secret is missing");
        //     throw new Error("Server configuration error");
        // }
        // try {
        // const decoded = jwt.verify(token, secret ) as { userId?: number };
        // userId = decoded?.userId;
        // if (!userId) {
        //     throw new Error("Invalid token: userId not found");
        // }
        // } catch (error) {
        // console.error("Token verification error:", error);
        // throw new Error("Invalid or expired token, please login again!");
        // }

        const payload = parsed.data
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${url}/api/v1/job/createJob`,  payload, config)
        return {
            success:true,
            message: response.data?.msg || 'job created successfully',
            errors:[],
        }
        
    } catch (error :any) {
        console.error('api error:', error.response.data)
        const errorField = 'unknown'
        const msg = error.response?.data?.msg ||
        (error.code === "ERR_INTERNET_DISCONNECTED"
            ? "No internet connection!"
            : error.response?.status === 404
            ? "Resource not found!"
            : error.response?.status === 500
            ? "Server error, please try later!"
            : "Request failed, please try again.");
        console.error('CreateJobError',error)
          return {
            success:false,
            errors:[{field: errorField, message:msg}],
            message: msg
        } 
    }
}

export async function getAllJobs (params: GetJobsParams = {}): Promise<GetJobsResponse> {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        if(!url) {
            throw new Error("no URL provided")
        }
        const token = (await cookies()).get('authToken')?.value
        console.log('authToken', token);
        
        if(!token) {
            throw new Error('token not provided, please login !')
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            params: {
                page: params.page || 1,
                limit: params.limit || 10,
                jobType: params.jobType,
                ApplicationStatus: params.ApplicationStatus,
                search: params.search,
                sortBy: params.sortBy,
                order: params.order,
             },
        }
        const response = await axios.get(`${url}/api/v1/job/getJobs`, config)
        console.log('get jobs response:', response.data)
        return {
            success: true,
            errors: [],
            message: response.data.msg  || 'jobs retrieved successfully',
            data: {
                page: response.data.page,
                limit: response.data.limit,
                totalJobs: response.data.totalJobs,
                totalPages: response.data.totalPages,
                jobs: response.data.jobs,
             },
        }

        
    } catch (error:any) {
        console.error(error)
        const errorField = "unknown";
        let msg = "Request failed, please try again.";
        let errors: { field: string; message: string }[] = [{ field: errorField, message: msg }];
        if (error.response) {
            console.error("API Error Response (full):", error.response.data);
            console.error("API Error Status:", error.response.status);
            console.error("API Error Headers:", error.response.headers);
            if (error.response.status === 400) {
                msg = error.response.data?.msg || "Invalid request data.";
                errors = error.response.data?.errors?.map((err: { path: string; message: string }) => ({
                field: err.path || errorField,
                message: err.message,
                })) || [{ field: errorField, message: msg }];
            } else if (error.response.status === 401) {
                msg = error.response.data?.msg || "Authentication failed, please log in again.";
                errors = [{ field: errorField, message: msg }];
            } else if (error.response.status === 404) {
                msg = "Resource not found!";
                errors = [{ field: errorField, message: msg }];
            } else if (error.response.status === 500) {
                msg = "Server error, please try later!";
                errors = [{ field: errorField, message: msg }];
            } else {
                msg = error.response.data?.msg || "Request failed, please try again.";
                errors = [{ field: errorField, message: msg }];
            }
            } else if (error.code === "ERR_INTERNET_DISCONNECTED") {
            msg = "No internet connection!";
            errors = [{ field: errorField, message: msg }];
            } else if (error.message) {
            msg = error.message;
            errors = [{ field: errorField, message: msg }];
            }

            console.error("GetAllJobsError:", error);
            return {
            success: false,
            message: msg,
            errors,
            data: undefined,
            };
  }
}
