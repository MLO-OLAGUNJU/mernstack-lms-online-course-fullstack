import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[#d0deff]",
        success: "bg-emerald-100",
      },
      // iconVariant: {
      //   default: "text-[#3857A1]",
      //   succes: "text-emerald-700",
      // },
      size: {
        default: "p-2",
        sm: "p-1",
      },
      defualtVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

const iconvariants = cva("", {
  variants: {
    variant: {
      default: "text-[#3857A1]",
      success: "text-emerald-700",
    },
    size: {
      default: "w-8 h-8",
      sm: "w-4 h-4",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconvariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadges = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconvariants({ variant, size }))} />
    </div>
  );
};
