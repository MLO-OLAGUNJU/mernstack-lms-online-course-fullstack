"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./SearchInput";

const NavBarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-3 ml-auto">
        {isTeacherPage ? (
          <Link
            href={"/"}
            className="mr-[10px] rounded-md border-1 bg-[#d0deff] border-solid"
          >
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="md:hidden hidden lg:flex">Exit</span>
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link
            href={"/teacher/courses"}
            className="rounded-md border-1 bg-[#d0deff] border-solid"
          >
            <Button size="sm" variant="ghost">
              Instructor mode
            </Button>
          </Link>
        ) : null}

        <div className="flex flex-col items-center justify-center">
          <div className="p-1 bg-[#d0deff] rounded-full">
            <UserButton afterSignOutUrl="/" />
          </div>
          {/* <div className="flex flex-row items-center justify-center">
          <span className="text-sm">Me</span>
          <TiArrowSortedDown />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default NavBarRoutes;
