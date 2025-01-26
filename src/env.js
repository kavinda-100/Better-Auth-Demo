import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BETTER_AUTH_SECRET: z.string().min(5, "Must be at least 5 characters"),
    BETTER_AUTH_URL: z.string().url(),
    EMAIL_VERIFICATION_CALLBACK_URL: z.string().url(),
    MY_EMAIL: z.string().email(),
    MY_EMAIL_PASSWORD: z.string().min(4, "Must be at least 8 characters"),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    EMAIL_VERIFICATION_CALLBACK_URL:
      process.env.EMAIL_VERIFICATION_CALLBACK_URL,
    MY_EMAIL: process.env.MY_EMAIL,
    MY_EMAIL_PASSWORD: process.env.MY_EMAIL_PASSWORD,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
