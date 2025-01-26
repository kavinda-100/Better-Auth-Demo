import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className={"container mx-auto min-h-screen p-2"}>
      {children}
    </section>
  );
};
export default AuthLayout;
