import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadges } from "@/components/IconBadge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachemntsForm from "./_components/AttachemntsForm";
import ChaptersForm from "./_components/ChaptersForm";
import { Banner } from "@/components/banner";
import { CourseActions } from "./_components/CourseActions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // console.log(categories);

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    // course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          label={`Your course '${course.title}' is not published. It will not be visible to the students.`}
        />
      )}
      <div className="p-6 h-full bg-[#f4f3f3]">
        <div className="flex items-center justify-between">
          <div className=" flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields <span>{completionText}</span>
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadges
                size={"default"}
                variant={"default"}
                icon={LayoutDashboard}
              />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadges
                  size={"default"}
                  variant={"default"}
                  icon={ListChecks}
                />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div className="flex items-center gap-x-2">
              <IconBadges
                size={"default"}
                variant={"default"}
                icon={CircleDollarSign}
              />
              <h2 className="text-xl">Sell your course</h2>{" "}
            </div>
            <PriceForm initialData={course} courseId={course.id} />
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadges size={"default"} variant={"default"} icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>{" "}
              </div>
              <AttachemntsForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
