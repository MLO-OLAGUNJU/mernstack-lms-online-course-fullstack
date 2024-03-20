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
          className="rounded-md border-1 bg-[#dedede] border-solid"
        >
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link
          href={"/teacher/courses"}
          className="rounded-md border-1 bg-[#dedede] border-solid"
        >
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <div className="p-1 bg-[#dedede] rounded-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBarRoutes;
