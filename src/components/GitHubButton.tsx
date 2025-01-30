"use client";

import React from "react";
import { Button } from "./ui/button";
import { authClient } from "../server/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ErrorContext } from "@better-fetch/fetch";
import { Loader2 } from "lucide-react";

const GitHubButton = ({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };
  return (
    <Button
      variant={"outline"}
      disabled={loading}
      onClick={handleClick}
      className={"w-full"}
    >
      {loading ? (
        <Loader2 className={"size-4 animate-spin"} />
      ) : (
        <span className={"flex items-center gap-2"}>
          {icon} {text}
        </span>
      )}
    </Button>
  );
};
export default GitHubButton;
