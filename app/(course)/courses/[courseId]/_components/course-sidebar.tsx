import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/CourseProgress";
import { CourseSidebarItem } from "./course-sidebar-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdExitToApp } from "react-icons/md";
import { ArrowLeft } from "lucide-react";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto bg-[#fff] shadow-sm">
      <div className="px-7 py-5 gap-3 flex flex-col bg-[#3857A1] text-white">
        <Link href={"/search"}>
          <Button className="flex gap-5">
            <ArrowLeft />
          </Button>
        </Link>

        <h1 className="font-semibold text-lg">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full bg-white ">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
