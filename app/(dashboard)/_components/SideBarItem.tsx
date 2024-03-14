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
    <div>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] w-full pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
            "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
        )}
      >
        <div className="flec items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-[#3857A1]")}
          />
        </div>
        {label}
      </button>
    </div>
  );
};

export default SideBarItem;
