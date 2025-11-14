"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/lib/services/authApi";

function UserDropdown() {
  let isUser;
  const dispatch = useAppDispatch();
      const [logoutUser]  = useLogoutMutation();
      if (typeof window !== "undefined") {
    isUser =  JSON.parse(localStorage.getItem("user") ?? "null") ;
      }

  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
    const res = await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const avatarLetter = isUser?.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "U";
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <Avatar className="h-10 w-10">
              <AvatarImage
               src={`https://placehold.co/40x40/000000/ffffff?text=${avatarLetter}`}
                alt="User Avatar"
              />
              {/* <AvatarFallback>{avatarLetter}</AvatarFallback> */}
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-fit mr-4" align="end">
          <DropdownMenuLabel>{isUser?.email || user?.email || "My Account"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => setOpen(true)} // Open confirmation dialog
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button  onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserDropdown;
