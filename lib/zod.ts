import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" }),
});

export const registerSchema = object({
  name: string()
    .min(5, "Name must be at least 5 characters long")
    .max(50, "Name must be 50 characters or less"),

  username: string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, underscores, and dots"
    )
    .refine((value) => !/\s/.test(value), "Username cannot contain spaces"),

  email: string().min(1, "Email is required").email("Invalid email address"),

  password: string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be 32 characters or less"),
});

export const commentSchema = string({
  required_error: "Make sure your comment isn't empty",
}).min(5, "Comments must be at least 5 characters long");
