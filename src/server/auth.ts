import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { sendPasswordResetEmail, sendVerificationEmail } from "../emails";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    //* session configuration (cookie) - this is required. at the beginning of auth configuration.
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  // this will enable email and password login and there need to verify their email.
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // This will send and email to reset the password.
    sendResetPassword: async ({ user, url }) => {
      // send email to reset password.
      await sendPasswordResetEmail({
        url,
        name: user.name,
        receiverEmail: user.email,
      });
    },
  },
  // in this case, we email the user to verify the email.
  emailVerification: {
    sendOnSignUp: false, // send email when signUp this case send email manually.
    autoSignInAfterVerification: true, // user will auto signIn after they verify their email.
    sendVerificationEmail: async ({ user, url }) => {
      console.log("email url", url);
      // send email to verify email.
      await sendVerificationEmail({
        url: url,
        name: user.name,
        receiverEmail: user.email,
      });
    }, // method to send the email.
  },
  plugins: [openAPI()], // all the plugins are goose here.
  /**
   * by going to the http://localhost:3000/api/auth/reference/ you can access OpenApi endpoint.
   **/
} satisfies BetterAuthOptions);

/**
 *@description using this type, You can get the session in the client side using props.
 *
 *@example
 * "use client"
 *
 * export default Page(session: AuthSession){
 *   return (
 *      <div>{session}</div>
 *   )
 * }
 *
 **/
export type AuthSession = typeof auth.$Infer.Session;
