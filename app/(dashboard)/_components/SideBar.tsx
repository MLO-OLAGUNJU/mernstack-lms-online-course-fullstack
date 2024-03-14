import React from "react";
import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto bg-[#f9f9f9] shadow-sm">
      <div className=" p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
