"use client";

import { useGetBlogByUserQuery } from "@/lib/services/blogApi";
import { BlogPost } from "@/types";
import BlogCard from "../Blogs/blogCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { getErrorMessage } from "@/lib/getErrormessage";

export default function UserBlog() {
  const { 
    data: userBlog, 
    isLoading, 
    isError, 
     error,
    refetch 
  } = useGetBlogByUserQuery({});

  const posts: BlogPost[] = userBlog?.data?.post || [];

  if (isLoading) {
  return (
    <main className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black" />
    </main>
  );
}

 if (isError) {
  return (
    <main className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="p-0">
          <CardTitle className="text-red-500 text-center">Error Loading Blogs</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground text-center">
            {getErrorMessage(error) || "Something went wrong."}
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={() => refetch()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}


  if (posts.length === 0) {
    return (
      <main className="flex justify-center items-center h-full ">
        <p>You have not created any blogs yet.</p>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-4">
      {posts.map((post: BlogPost) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </main>
  );
}