"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
const SideBarItem = ({ icon: Icon, label, href }: SideBarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] w-full pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-[#3857A1] bg-[#d0deff] hover:bg-[#d0deff] hover:text-[#3857A1]"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-[#3857A1]")}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-solid border-[#3857A1] h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SideBarItem;
