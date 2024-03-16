import React from "react";
import { db } from "@/lib/db";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  return <div>Course Id: {params.courseId}</div>;
};

export default CourseIdPage;
