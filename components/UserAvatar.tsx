import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

const UserAvatar = ({ src }: { src: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={src} alt={"user.png"} />
          <AvatarFallback>user.png</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full"
          >
            <button className="w-full flex items-center justify-between text-red-500">
              Sign out
              <LogOut size={14} />
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
