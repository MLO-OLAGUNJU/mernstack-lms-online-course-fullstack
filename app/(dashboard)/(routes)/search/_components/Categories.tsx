"use client";

import { Category } from "@prisma/client";

import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";
import { CgDesignmodo } from "react-icons/cg";
import { RiProductHuntFill } from "react-icons/ri";
import { HiOutlineDatabase } from "react-icons/hi";
import { FaCode } from "react-icons/fa";
import { SiVorondesign } from "react-icons/si";
import { FaVideo } from "react-icons/fa6";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaWordpress } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaFigma } from "react-icons/fa";
import { MdWebAsset } from "react-icons/md";
import { MdDeveloperBoard } from "react-icons/md";
import { SiXdadevelopers } from "react-icons/si";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Graphics Design": CgDesignmodo,
  "Product Management": RiProductHuntFill,
  "Data Analytics": HiOutlineDatabase,
  "Web Development": MdWebAsset,
  "Frontend Development": SiXdadevelopers,
  "Backend Development": MdDeveloperBoard,
  "Fullstack Development": FaCode,
  "UI/UX Design": FaFigma,
  "Video Editing": FaVideo,
  "Mobile app Development": TbDeviceMobileCode,
  "Wordpress Development": FaWordpress,
  "Data Analytics and Engineering": TbDeviceAnalytics,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex  items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
