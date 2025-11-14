import { BlogPost, PostList } from "@/types";
import BlogCard from "./blogCard";


export default function BlogPage({ post }: PostList) {

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our space for insights, tutorials, and stories from the front lines of technology and design.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {post?.map((post:BlogPost) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
}
