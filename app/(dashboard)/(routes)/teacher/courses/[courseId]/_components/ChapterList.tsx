"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface ChapterListPops {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChapterList = ({ onEdit, onReorder, items }: ChapterListPops) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div>ChapterList</div>;
};

export default ChapterList;
