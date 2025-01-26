import React from "react";
import Header from "../../components/Header";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className={"container mx-auto flex min-h-screen flex-col"}>
      <Header />
      <section className={"flex-1"}>{children}</section>
    </main>
  );
};
export default HomeLayout;
