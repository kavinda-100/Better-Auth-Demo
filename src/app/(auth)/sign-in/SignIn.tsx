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
import { SignInSchema } from "../../../zod/auth";
import SubmitButton from "@/components/SubmitButton";
import { authClient } from "../../../server/auth-client";
import FormError from "../../../components/FormError";
import FormSuccess from "../../../components/FormSuccess";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GitHubButton from "../../../components/GitHubButton";
import { Github } from "lucide-react";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          setError(null);
          setSuccess(
            "Successfully signed in. Redirecting to home page in 3 seconds.",
          );
          setLoading(false);
          form.reset();
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 3000);
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            // if user email is not verified
            setError("Please verify your email address");
          } else {
            setError(ctx.error.message);
          }
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
        <CardTitle className={"text-2xl"}>Sign In 🔑</CardTitle>
        <CardDescription>Better Auth Sign In Form</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"w-full space-y-4"}>
          <GitHubButton text={"Sign In with GitHub"} icon={<Github />} />
          <p className={"text-center text-xs text-muted-foreground"}>or</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <SubmitButton type={"submit"} isLoading={loading}>
              Sign In
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className={"flex flex-col items-start justify-start gap-2"}>
        <p className={"text-xs text-muted-foreground"}>
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} className="text-primary underline">
            Sign Up
          </Link>
        </p>
        <p className={"text-xs text-muted-foreground"}>
          Forgot your password?{" "}
          <Link href={"/forgot-password"} className="text-primary underline">
            Reset Password
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default SignIn;
