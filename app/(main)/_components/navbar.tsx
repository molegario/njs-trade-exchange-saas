"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

const NavbarMain = () => {
  const { userId } = useAuth();
  return (
    <div className="border-b flex flex-0 items-center shadow-sm px-5 h-[64px] sticky top-0 z-20">
      <div>
        <ModeToggle />
      </div>
      <div className="flex gap-x-2 ml-auto">
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
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
 
export default NavbarMain;