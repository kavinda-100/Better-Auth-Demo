import React from "react";
import SignIn from "./SignIn";

const Page = () => {
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-2"
      }
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <SignIn />
    </section>
  );
};
export default Page;
