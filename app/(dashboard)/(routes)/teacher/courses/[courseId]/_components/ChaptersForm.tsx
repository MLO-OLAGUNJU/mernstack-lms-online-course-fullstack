"use client";
import React, { useState } from "react";
import { Chapter, Course } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Info, Loader2, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChapterList from "./ChapterList";

interface ChaptersFormProps {
  initialData: Course & {
    chapters: Chapter[];
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created successfully");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });

      toast.success("Chapters reordered successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="mt-6 relative border bg-[#d0deff] rounded-md p-4">
      {isUpdating && (
        <div className=" absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-[#3857A1]" />
        </div>
      )}
      <div className=" font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant={"ghost"} className="bg-white">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span className="md:hidden hidden lg:flex">Add a chapter</span>
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. Introduction to the course"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            </form>
          </Form>
        </>
      )}

      {!isCreating && (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              !initialData.chapters.length && "text-slate-500 italic"
            )}
          >
            {!initialData.chapters.length && "No chapters"}
            <ChapterList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          </div>
        </>
      )}

      {!isCreating && (
        <div className="flex items-center gap-2 mt-4">
          <Info className="text-xs text-muted-foreground" />
          <p className="text-xs text-muted-foreground italic">
            Drag and drop to reorder the chapters
          </p>
        </div>
      )}
    </div>
  );
};

export default ChaptersForm;
