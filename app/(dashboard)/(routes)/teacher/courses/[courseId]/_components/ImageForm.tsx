"use client";
import React, { useState } from "react";
import { Course } from "@prisma/client";
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
import { ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUpload } from "@/components/fileUpload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "imageUrl is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData?.imageUrl || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-[#d0deff] rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant={"ghost"} className="bg-white">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Upload an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Change uploaded image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex mt-5 items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <>
            <div className="relative aspect-video mt-2">
              <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          </>
        ))}
      {isEditing && (
        <>
          <div>
            <FileUpload
              endpoint="couseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-sm text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageForm;
