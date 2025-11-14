import Link from "next/link";
import UserDropdown from "./userDropdown";

export default function Header() {
  return (
    <nav className="bg-white border-b shadow-sm w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
            BlogApp
          </Link>
         <UserDropdown/>
          
          
        </div>
      </div>
    </nav>
  );
}

