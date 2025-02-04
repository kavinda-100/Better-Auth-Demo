"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPasswordSchema } from "../../../zod/auth";
import SubmitButton from "../../../components/SubmitButton";
import { authClient } from "../../../server/auth-client";
import FormError from "../../../components/FormError";
import FormSuccess from "../../../components/FormSuccess";

function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const token = searchParams.get("token");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    // clear the error and success message.
    setError("");
    setSuccess("");
    setPending(true);
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token: token ?? "",
    });
    if (error) {
      setError(error?.message);
    } else {
      setSuccess("Password reset successfully.");
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
    setPending(false);
  };

  // if the url has an error, show the error message.
  if (urlError === "invalid_token") {
    return (
      <section className={"flex h-full w-full items-center justify-center"}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Invalid Link</CardTitle>
            <CardDescription>
              The link is invalid or expired. Please try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    );
  }
  return (
    <div className="flex grow items-center justify-center p-4">
      <Card className={"w-full px-3 lg:w-[400px] lg:px-0"}>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <SubmitButton isLoading={pending} type={"submit"}>
                Reset Password
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

const ResetPassword = () => {
  /**
   * @description
   * This is a lazy-loaded component.
   * this is mandatory to use the lazy loading for the component.
   * because the component is using the useSearchParams hook.
   * in Next.js 15, we have to use the lazy loading for the component.
   **/
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};
export default ResetPassword;
