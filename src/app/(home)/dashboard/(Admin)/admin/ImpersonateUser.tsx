"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "../../../../../server/auth-client";
import { toast } from "sonner";
interface ImpersonateUserProps {
  userId: string;
  email: string;
  mySessionId: string;
}

export default function ImpersonateUser({
  userId,
  email,
  mySessionId,
}: ImpersonateUserProps) {
  const router = useRouter();

  const handleImpersonateUser = async () => {
    try {
      await authClient.admin.impersonateUser({
        userId: userId,
      });
      router.push("/");
      toast.success(`You are now impersonating as ${email}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
      toast.error(`Failed to impersonate as ${email}`);
    }
  };

  return (
    <Button
      onClick={handleImpersonateUser}
      variant="outline"
      size="sm"
      disabled={mySessionId === userId}
    >
      Impersonate
    </Button>
  );
}
