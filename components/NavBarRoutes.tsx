"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavBarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex items-center gap-x-5 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link
          href={"/"}
          className="border-[#3857A1] rounded-md border-1 bg-white border-solid"
        >
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link
          href={"/teacher/courses"}
          className="border-[#3857A1] rounded-md border-1 bg-white border-solid"
        >
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBarRoutes;
