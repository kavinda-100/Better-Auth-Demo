import React from "react";
import SignIn from "./SignIn";

const Page = () => {
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-2"
      }
    >
      <SignIn />
    </section>
  );
};
export default Page;
