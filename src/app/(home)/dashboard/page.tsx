import React from "react";
import { getSession } from "../../../server/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await getSession();
  // console.log({ session });
  return (
    <section
      className={
        "flex h-[calc(100vh-60px)] flex-col items-center justify-center"
      }
    >
      <h1 className={"text-pretty text-4xl font-extrabold"}>
        Better Auth Demo Project
      </h1>
      <p className={"text-pretty text-xl text-muted-foreground"}>
        This is a demo project for better auth
      </p>
      {session?.user?.role === "admin" && (
        <>
          <Button asChild className={"my-5"}>
            <Link href={"/dashboard/admin"}>Admin Dashboard</Link>
          </Button>
        </>
      )}
      {session && (
        <Card className={"mt-5"}>
          <CardHeader>
            <CardTitle>Your Session Details</CardTitle>
            <CardDescription>
              This is where you can see your session details.
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-3"}>
            <div className={"flex justify-between gap-5"}>
              <p className={"font-bold"}>Name:</p>
              <p className={"font-bold text-muted-foreground"}>
                {session?.user?.name}
              </p>
            </div>
            <div className={"flex justify-between gap-5"}>
              <p className={"font-bold"}>Email:</p>
              <p className={"font-bold text-muted-foreground"}>
                {session?.user?.email}
              </p>
            </div>
            <div className={"flex justify-between gap-5"}>
              <p className={"font-bold"}>Email Verified:</p>
              <p className={"font-bold text-muted-foreground"}>
                {session?.user?.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
export default DashboardPage;
