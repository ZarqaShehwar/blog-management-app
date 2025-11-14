
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export function getErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong.";
  if (typeof error === "object" && error !== null && "status" in error) {
    const fetchError = error as FetchBaseQueryError & { data?: { message?: string } };
    return fetchError.data?.message || "Something went wrong.";
  }
  return (error as any)?.message || "Something went wrong.";
}
