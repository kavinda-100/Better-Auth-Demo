import React from "react";
import { ShieldBan } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ShieldBan className={"size-4"} />
      {message}
    </div>
  );
};

export default FormError;
