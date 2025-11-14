"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useAddBlogMutation } from "@/lib/services/blogApi";
import { type CreateFormData, formSchema } from "@/lib/validations";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
 import 'react-quill-new/dist/quill.snow.css'; 




export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [createPost, { isLoading }] = useAddBlogMutation();

  const form = useForm<CreateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: undefined,
      content: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append("content", data.content);

      await createPost(formData).unwrap();
      toast.success("Post created successfully!");
      form.reset();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🔘 Trigger button */}
      <DialogTrigger asChild>
        <Button size="lg" className="ml-auto flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-fit px-2 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      className="focus:ring-2 focus:ring-primary/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            {/* Image */}
<FormField
  control={form.control}
  name="image"
  render={({ field: { onChange, value, ...field } }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file); // ✅ store single File instead of FileList
        setPreview(URL.createObjectURL(file));
      }
    };

    return (
      <FormItem>
        <FormLabel>Upload Image</FormLabel>
        <FormControl>
          <div className="flex flex-col gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              {...field}
            />
            {preview && (
              <img
                src={preview}
                alt="Selected Preview"
                className="size-15 rounded-md object-cover border"
              />
            )}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>


            {/* React Quill */}
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
                      className="bg-white rounded-md h-[200px]"
                      placeholder="Write your post content..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-end pt-16 md:pt-10">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? "Creating..." : "Create Post"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
