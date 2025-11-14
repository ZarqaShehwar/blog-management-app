import CreatePostDialog from "@/components/Blogs/CreatePost";
import UserBlog from "@/components/dashboard/UserBlogs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Dashboard(){
  return (
    <div >
 <header className="w-full flex items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground">All Posts</h1>
              <p className="text-muted-foreground text-sm">
                Manage your blog posts
              </p>
            </div>
           <CreatePostDialog/>
 </header>
<UserBlog/>
    </div>
  )
}