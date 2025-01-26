import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Page = () => {
  return (
    <section
      className={"flex min-h-screen flex-col items-center justify-center gap-4"}
    >
      <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
        <ShieldCheck className={"size-4"} />
        Email Verified successfully.
      </div>
      <Button asChild>
        <Link href={"/"}>Go Home</Link>
      </Button>
    </section>
  );
};
export default Page;
