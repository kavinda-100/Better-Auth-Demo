import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  BETTER_AUTH_SECRET: z.string().min(5, "Must be at least 5 characters"),
  BETTER_AUTH_URL: z
    .string({ message: "BETTER_AUTH_URL is required" })
    .url({ message: "BETTER_AUTH_URL is invalid" }),
  EMAIL_VERIFICATION_CALLBACK_URL: z
    .string({ message: "EMAIL_VERIFICATION_CALLBACK_URL is required" })
    .url({ message: "EMAIL_VERIFICATION_CALLBACK_URL is invalid" }),
  MY_EMAIL: z
    .string({ message: "email is required" })
    .email({ message: "email is invalid" }),
  MY_EMAIL_PASSWORD: z.string().min(4, "Must be at least 8 characters"),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
  console.error(env.error.errors);
  throw new Error("Environment validation failed:");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;
