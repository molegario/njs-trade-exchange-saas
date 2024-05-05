"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
// import Logo from "./logo";

const NavbarMain = () => {
  const { userId } = useAuth();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-between">
      <MobileSidebar />
      <div className="h-full w-[360px] relative pl-0">
        {/* <Link href="/">
          <Logo />
        </Link> */}
      </div>
      <div className="flex gap-x-2">
        {!userId && (
          <>
            <Link href="/sign-in">
              <Button size="sm" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" variant="secondary">
                Sign up
              </Button>
            </Link>
          </>
        )}
        {userId && (
          <>
            <Link href="/dashboard">
              <Button size="sm" variant="outline">
                Dashboard
              </Button>
            </Link>
            <Link href="/search">
              <Button size="sm" variant="outline">
                Browse posts
              </Button>
            </Link>
            <Link href="/dashboard/create">
              <Button size="sm" variant="secondary">
                Create a post
              </Button>
            </Link>
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
 
export default NavbarMain;