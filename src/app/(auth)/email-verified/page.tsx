import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Page = () => {
  return (
    <section
      className={"flex min-h-screen flex-col items-center justify-center gap-4"}
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
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
