"use client";
import React, { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/fileUpload";

interface AttachemntsFormProps {
  initialData: Course & {
    attachments: Attachment[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachemntsForm = ({ initialData, courseId }: AttachemntsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-[#d0deff] rounded-md p-4">
      <div className=" font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant={"ghost"} className="bg-white">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              {initialData.attachments.length < 0 && (
                <span className="md:hidden lg:flex">Upload file</span>
              )}
              {initialData.attachments.length > 0 && (
                <span className="md:hidden lg:flex">Upload more file</span>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-600 italic">
              No attachments added yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex mt-5 items-center p-3 w-full bg-[#d0deff] border-[#3857A1] border text-[#3857A1] rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs font-semibold text-blue-900 line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <>
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </>
                  )}

                  {deletingId !== attachment.id && (
                    <>
                      <button className="ml-auto hover:opacity-75 transition border-[1px] border-solid p-1 border-black rounded-full">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <>
          <div className="relative aspect-video mt-2 custom-upload-button">
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url });
                }
              }}
            />
            <div className="text-sm text-muted-foreground mt-4">
              Add anything your students might need to complete the cours.{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttachemntsForm;
