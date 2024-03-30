import { IconBadges } from "@/components/IconBadge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  size,
}: InfoCardProps) => {
  return (
    <div className=" flex items-center gap-x-3 group-hover:shadow-md group hover:shadow-sm transition overflow-hidden border[#000] shadow-lg border-solid border-[1px] rounded-lg bg-white p-3 h-full">
      <IconBadges variant={variant} size={size} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
