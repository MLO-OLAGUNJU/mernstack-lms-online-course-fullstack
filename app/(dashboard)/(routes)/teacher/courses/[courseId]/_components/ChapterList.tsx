"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";

interface ChapterListPops {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChapterList = ({ onEdit, onReorder, items }: ChapterListPops) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <>
                  <Draggable
                    key={chapter.id}
                    draggableId={chapter.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={cn(
                          "flex items-center gap-x-2 bg-[#fff] border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                          chapter.isPublished && "bg-[#d0deff] text-[#3857A1]"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                            chapter.isPublished &&
                              "border-r-[#d0deff] hover:bg-[#d0deff]"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5" />
                        </div>
                        {chapter.title}
                      </div>
                    )}
                  </Draggable>
                </>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ChapterList;
