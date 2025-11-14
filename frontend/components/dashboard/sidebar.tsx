"use client";

import { FileEdit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function HomeSidebar() {
  const pathname = usePathname(); 
  const [blogsOpen, setBlogsOpen] = useState(true); 

  const blogLinks = [
    { name: "All Post", href: "/dashboard" },
    { name: "Manage Post", href: "/dashboard/manage-posts" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <FileEdit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold ">BlogApp</span>
        </Link>
      </div>

      <nav className="p-4">
        {/* Blogs Section */}
        <div className="space-y-2">
          <button
            onClick={() => setBlogsOpen(!blogsOpen)}
            className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileEdit className="w-4 h-4" />
              Blogs
            </div>
          </button>

          <div className={`${blogsOpen ? "block" : "hidden"} ml-7 mt-1 space-y-1`}>
            {blogLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
