import React from "react";
import SignUp from "./SignUp";

const Page = () => {
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-2"
      }
    >
      <SignUp />
    </section>
  );
};
export default Page;
