import BlogPage from "@/components/Blogs/blog";
import { PostList } from "@/types";

export default async  function Blog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/blogs/`,{
  cache:"no-store"
})
 const { data }: { data: PostList } = await res.json();
 if(!data){
  return(
    <div className="w-full h-full grid place-content-center">
     <p>No data found .......</p>
    </div>
  )
 }
  return (
 <main>
  <BlogPage post={data?.post}/>
 </main>
  );
}