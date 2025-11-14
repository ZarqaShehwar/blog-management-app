"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { loginSuccess, logout } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export const useRefreshAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
            credentials: "include",
          });
          if (!res.ok) {
        dispatch(logout());
  router.push("/login");
  throw new Error("Unauthorized");
}
          const data = await res.json();
          dispatch(loginSuccess({ user: data?.user ,token:""}));
        } catch (err) {
          dispatch(logout());
        }
      };

      fetchUser();
    }
  }, [user, dispatch]);
};
