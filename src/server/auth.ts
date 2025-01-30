import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { sendVerificationEmail } from "../emails";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
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
  },
  // in this case, we email the user to verify the email.
  emailVerification: {
    sendOnSignUp: false, // send email when signUp this case send email manually.
    autoSignInAfterVerification: true, // user will auto signIn after they verify their email.
    sendVerificationEmail: async ({ user, url }) => {
      console.log("email url", url);
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
