"use client";

import React from "react";
import MobileSideBar from "./MobileSideBar";
import NavBarRoutes from "@/components/NavBarRoutes";
const NavBar = () => {
  return (
    <div className="p-6 border-b h-full flex  items-center bg-[#fff] shadow-sm">
      <MobileSideBar />
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
