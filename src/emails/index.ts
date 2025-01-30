import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { EmailVerification } from "./EmailVerification";
import { ResetPasswordEmail } from "./ResetPasswordEmail";

const MY_EMAIL = process.env.MY_EMAIL;
const MY_EMAIL_PASSWORD = process.env.MY_EMAIL_PASSWORD;

type sendVerificationEmailProps = {
  url: string;
  name: string;
  receiverEmail: string;
};

export const sendVerificationEmail = async ({
  url,
  name,
  receiverEmail,
}: sendVerificationEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: MY_EMAIL,
        pass: MY_EMAIL_PASSWORD,
      },
    });

    const emailHtml = await render(EmailVerification({ url, name }));

    const options = {
      from: MY_EMAIL,
      to: receiverEmail,
      subject: "Verify your email",
      html: emailHtml,
    };

    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.log("error in sendVerificationEmail:", error);
    return false;
  }
};

export const sendPasswordResetEmail = async ({
  name,
  url,
  receiverEmail,
}: {
  name: string;
  url: string;
  receiverEmail: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: MY_EMAIL,
        pass: MY_EMAIL_PASSWORD,
      },
    });

    const emailHtml = await render(ResetPasswordEmail({ name, url }));

    const options = {
      from: MY_EMAIL,
      to: receiverEmail,
      subject: "Reset your password",
      html: emailHtml,
    };

    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.log("error in sendPasswordResetEmail:", error);
    return false;
  }
};
