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
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                          {chapter.isFree && <Badge>Free</Badge>}
                          <Badge
                            className={cn(
                              "bg-slate-500",
                              chapter.isPublished && "bg-[#3857A1]"
                            )}
                          >
                            {chapter.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <Pencil
                            onClick={() => onEdit(chapter.id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                </>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ChapterList;
