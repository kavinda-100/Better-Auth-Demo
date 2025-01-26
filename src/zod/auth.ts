import { z } from "zod";

const emailSchema = () =>
  z
    .string({ message: "Email is required" })
    .email({ message: "Email is invalid" });

const passwordSchema = (type: "Password" | "ConfirmPassword") =>
  z
    .string({ message: `${type} is required` })
    .min(6, {
      message: `${type} must be at least 6 characters`,
    })
    .max(12, {
      message: `${type} must be at most 12 characters`,
    });

export const SignUpSchema = z
  .object({
    name: z.string({ message: "Name is required" }).min(4, {
      message: "Name must be at least 4 characters",
    }),
    email: emailSchema(),
    password: passwordSchema("Password"),
    confirmPassword: passwordSchema("ConfirmPassword"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
