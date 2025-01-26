import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className={"container mx-auto p-2 h-[60px] flex justify-between items-center border-b"}>
      <div className={"text-2xl font-bold text-gray-800"}>
        <Link href={"/"}>Better Auth</Link>
      </div>
      <div className={"flex gap-2 justify-center items-center"}>
         <Button variant={"secondary"}>
           Sign In
         </Button>
          <Button>
            Sign Up
          </Button>
      </div>
    </header>
  );
};
export default Header;
