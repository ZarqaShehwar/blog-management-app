import { BlogCardProps } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

export default function BlogCard({ post }: BlogCardProps) {
  const { title, image, content, slug, authorId, createdAt } = post;
  const description = truncateText(content, 100);
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white max-w-sm dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 flex flex-col">
      {/* Image */}
      <Link href={`/blogs/${slug}`} className="block overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-50 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Author & Date */}
        <div className="flex flex-col justify-start items-start text-xs text-gray-500 dark:text-gray-400">
          <span>{authorId?.name || "Anonymous"}</span>
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          <Link href={`/blogs/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>

        {/* Description */}
        <div
  className="prose dark:prose-invert line-clamp-3"
  dangerouslySetInnerHTML={{ __html: description }}
/>

        {/* Read More */}
        <Link
          href={`/blogs/${slug}`}
          className="self-end text-sm font-medium text-gray-900 dark:text-white inline-flex items-center hover:underline"
        >
          Read more
       <ArrowRight size={18} className="ml-2"/>
        </Link>
      </div>
    </div>
  );
}
