import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  type?: "submit" | "button";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const SubmitButton = ({type, isLoading, className, children}: SubmitButtonProps) => {
  return (
    <Button
      className={cn("w-full", className)}
      type={type ?? "submit"}
    >
      { isLoading ?
        <div className={"flex gap-3 justify-center items-center"}><Loader2 className={"size-4 animate-spin"}/> wait...</div> : children}
    </Button>
  );
};
export default SubmitButton;
