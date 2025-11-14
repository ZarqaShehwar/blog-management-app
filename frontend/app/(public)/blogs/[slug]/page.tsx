import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BlogPost } from "@/types";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/blogs/${slug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();
  const post: BlogPost | undefined = data?.post?.[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="h-full bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-4 py-10">
        <article className="max-w-4xl mx-auto space-y-10">
          {/* 🔙 Back Button */}
          <div>
            <Link href="/blogs">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>
            </Link>
          </div>

          {/* 🖼️ Blog Image */}
          <div className="aspect-video overflow-hidden rounded-2xl shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              preload
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* 📝 Blog Header */}
          <header className="space-y-3 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 text-gray-600">
              <span>By {post.authorId?.name || "Unknown Author"}</span>
              <span>•</span>
              <time>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {/* 💬 Blog Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}
