import { z } from "zod";

export const registerationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forget_password_Schema = z.object({
  email: z.string().email("Invalid email format"),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const jobSchema = z.object({
  company: z
    .string()
    .min(2, "company name must be at least 2 characters long")
    .max(50, "company name cannot be more than 50 characters long"),
  title: z
    .string()
    .min(2, "job title must be more than 2 characters long")
    .max(100, "job title too long"),
  location: z
    .string()
    .min(2, "location is required")
    .max(50, "location name too long"),
  jobType: z
  .string()
  .trim()
  .refine(
    (val) =>
      ["FULL_TIME", "HYBRID", "REMOTE", "INTERN", "CONTRACT", "ENTRY_LEVEL"].includes(val),
    { message: "Select a valid job type" }
  ),
  status: z
  .string()
  .trim()
  .refine(
    (val) => ["APPLIED", "INTERVIEW", "OFFERED", "REJECTED"].includes(val),
    { message: "Select a valid job status" }
  ),

  appliedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (use YYYY-MM-DD)")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  link: z.string().url("Provide a valid job link").optional().or(z.literal("")),
  notes: z
    .string()
    .max(500, "Notes should not exceed 500 characters")
    .optional()
    .or(z.literal("")),
});
