"use client";

import React from "react";
import MobileSideBar from "./MobileSideBar";
import NavBarRoutes from "@/components/NavBarRoutes";
const NavBar = () => {
  return (
    <div className="px-6 py-11 border-b h-full flex  items-center bg-[#fff] shadow-sm">
      <MobileSideBar />
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
