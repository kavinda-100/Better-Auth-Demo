import React from "react";
import { ShieldCheck } from "lucide-react";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 text-pretty rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <ShieldCheck className={"size-4"} />
      {message}
    </div>
  );
};

export default FormSuccess;
