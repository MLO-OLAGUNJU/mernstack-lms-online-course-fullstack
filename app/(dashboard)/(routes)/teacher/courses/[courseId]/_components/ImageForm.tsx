"use client";
import React, { useState } from "react";
import { Course } from "@prisma/client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
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
              <span className="md:hidden lg:flex">Upload an image</span>
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <span className="md:hidden hidden lg:flex">
                Change uploaded image
              </span>
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
          <div className="relative aspect-video mt-2 custom-upload-button">
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
