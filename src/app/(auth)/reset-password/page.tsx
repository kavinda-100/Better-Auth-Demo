import React from "react";
import ResetPassword from "./ResetPassword";

const Page = () => {
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-2"
      }
    >
      <ResetPassword />
    </section>
  );
};
export default Page;
