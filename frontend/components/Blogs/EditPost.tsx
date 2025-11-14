"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit2 } from "lucide-react";
import { useUpdateBlogMutation } from "@/lib/services/blogApi";
import { BlogPost } from "@/types";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
 import 'react-quill-new/dist/quill.snow.css'; 
import { EditBlogFormData, editBlogSchema } from "@/lib/validations";



export default function EditBlogDialog({ blog }: { blog: BlogPost }) {
  const [open, setOpen] = useState(false);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const form = useForm<EditBlogFormData>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: blog.title,
      image: blog.image,
      content: blog.content,
    },
  });

  const image = form.watch("image");

  const onSubmit = async (data: EditBlogFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      await updateBlog({ id: blog._id, data: formData }).unwrap();
      toast.success("Blog updated successfully!");
      setOpen(false);
    } catch {
      toast.error("Failed to update blog");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Edit2 className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-2xl max-h-fit px-2">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Image Upload */}
            <FormField
  control={form.control}
  name="image"
  render={({ field: { onChange } }) => (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file); // updates RHF state
          }}
        />
      </FormControl>

      {/* Preview */}
      {typeof image === "string" && (
        <img
          src={image}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-md mt-2"
        />
      )}
      {image instanceof File && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="size-15 object-cover rounded-md mt-1"
        />
      )}
      <FormMessage />
    </FormItem>
  )}
/>


            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter post title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* React Quill Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-white rounded-md  h-[200px]"
                      placeholder="Write your post content..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="pt-14 md:pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
