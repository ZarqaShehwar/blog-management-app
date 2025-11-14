import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password must be less than 100 characters" }),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z
    .instanceof(File, { message: "Please select one image file" })
    .refine((file) => file && file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
  content: z.string().min(10, "Content must be at least 130 characters"),
});
export type CreateFormData = z.infer<typeof formSchema>;


export const editBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.any().optional(),
  content: z.string().min(10, "Content must be at least 130 characters"),
});

export type EditBlogFormData = z.infer<typeof editBlogSchema>;