import Link from "next/link";


export default async function NotFoundPage() {
  return (
 <div className="h-full flex items-center justify-center">
      <div className="text-center p-6">
        <div className="text-[120px] leading-none font-extrabold text-black/90">404</div>
        <div className="text-3xl font-bold mt-2">Error</div>
        <p className="text-gray-600 mt-2">
          Opps!!! This page you are looking for could not be found.
        </p>
        <Link href="/" className="inline-block mt-6 bg-primary text-white px-4 py-2 rounded-md">
          Go Back To Home
        </Link>
      </div>
    </div>
  );
}
