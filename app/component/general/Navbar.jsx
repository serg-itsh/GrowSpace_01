"use client";

import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
// import { buttonVariants } from "./components/ui/button.tsx"

// import {
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


// export async function Navbar() {
export  function Navbar() {
  // const {getUser} = getKindeServerSession();
  const {getUser} = useKindeBrowserClient();
  // const user = await getUser();
  const user = getUser();

  return (
    <nav className="py-5 flex item-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Blog<span className="text-blue-500">Marshal</span>
          </h1>
        </Link>
        <div className="hidden sm:flex item-center gap-6">
          <Link
            className="text-smfont-medium hover:text-blue-500 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-smfont-medium hover:text-blue-500 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>Logout</LogoutLink>
        </div>
      ):(
        <div className="flex items-center gap-4">       
        <LoginLink className={buttonVariants()}>Login</LoginLink>
        <RegisterLink className={buttonVariants({ variant: "secondary" })}>
          Sign up
        </RegisterLink>
        {/* <Button>Login</Button>
        <Button variant="secondary">Sign up</Button> */}
      </div>
      )}
     
    </nav>
  );
}
