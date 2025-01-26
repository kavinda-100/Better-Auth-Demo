import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { sendVerificationEmail } from "../emails";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  // this will enable email and password login and there need to verify their email.
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  // in this case, we email the user to verify the email.
  emailVerification: {
    sendOnSignUp: true, // send email when signUp
    autoSignInAfterVerification: true, // user will auto signIn after they verify their email.
    sendVerificationEmail: async ({ user, token }) => {
      const verificationEmailUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackUrl=
      ${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendVerificationEmail({
        url: verificationEmailUrl,
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
