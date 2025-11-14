"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { HomeSidebar } from "./sidebar";
import UserDropdown from "./userDropdown";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <div className="hidden lg:block">
        <HomeSidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-white border-r border-gray-200">
            <HomeSidebar />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow-md px-4 py-3 border-b">
          <button
            className="lg:hidden rounded-md hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          
          <div className="ml-auto" >
           <UserDropdown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4  bg-gray-50 w-full">{children}</main>
      </div>
    </div>
  );
}
