"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

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

  return <div>SideBarItem</div>;
};

export default SideBarItem;
