import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "../server/session";
import SignOutButton from "./SignOutButton";

const Header = async () => {
  const session = await getSession();
  return (
    <header
      className={
        "container mx-auto flex h-[60px] items-center justify-between border-b p-2"
      }
    >
      <div className={"text-2xl font-bold text-gray-800"}>
        <Link href={"/"}>Better Auth</Link>
      </div>
      <div>
        {session?.user ? (
          <div className={"flex items-center justify-center gap-2"}>
            <p className={"font-bold text-muted-foreground"}>
              {session?.user?.name}
            </p>
            <SignOutButton />
          </div>
        ) : (
          <div className={"flex items-center justify-center gap-2"}>
            <Button variant={"secondary"}>Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
