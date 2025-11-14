"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full grid place-content-center p-4 ">
      <div className="text-center">
        <p className="text-red-500 font-semibold">Error Loading Blogs</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
