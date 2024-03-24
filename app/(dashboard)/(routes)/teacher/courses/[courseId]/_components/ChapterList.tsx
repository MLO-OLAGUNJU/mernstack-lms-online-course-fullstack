"use client";
import { Chapter } from "@prisma/client";
import React from "react";

interface ChapterListPops {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChapterList = ({ onEdit, onReorder, items }: ChapterListPops) => {
  return <div>ChapterList</div>;
};

export default ChapterList;
