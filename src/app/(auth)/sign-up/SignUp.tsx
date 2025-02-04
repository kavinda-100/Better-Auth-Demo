"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { SignUpSchema } from "../../../zod/auth";
import SubmitButton from "@/components/SubmitButton";
import { authClient } from "../../../server/auth-client";
import FormError from "../../../components/FormError";
import FormSuccess from "../../../components/FormSuccess";
import Link from "next/link";
import GitHubButton from "../../../components/GitHubButton";
import { Github } from "lucide-react";

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const sendVerificationEmail = async (email: string) => {
    await authClient.sendVerificationEmail({
      email: email,
      callbackURL: "/email-verified", // The redirect URL after verification
    });
  };

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          setError(null);
          // send the email
          await sendVerificationEmail(values.email);
          setSuccess(
            "Verification Email sent. Please check your email for verification.",
          );
          setLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
          setSuccess(null);
          console.log("error in sign up:", ctx.error.message);
        },
      },
    );
  }
  return (
    <Card className={"w-full px-3 lg:w-[400px] lg:px-0"}>
      <CardHeader>
        <CardTitle className={"text-2xl"}>Sign Up 🔑</CardTitle>
        <CardDescription>Better Auth Sign Up Form</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"w-full space-y-4"}>
          <GitHubButton text={"Sign Up with GitHub"} icon={<Github />} />
          <p className={"text-center text-xs text-muted-foreground"}>or</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <SubmitButton type={"submit"} isLoading={loading}>
              Sign Up
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className={"text-center text-xs text-muted-foreground"}>
          Already have an account?{" "}
          <Link href={"/sign-in"} className="text-primary underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default SignUp;
