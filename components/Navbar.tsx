import React from "react";
import Logo from "./Logo";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
// import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto px-4 h-[100px] flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <ul className="flex items-center gap-x-4">
        <li>
          <Button variant="outline" asChild>
            <Link href={"/add"}>
              Add Todo <Plus />
            </Link>
          </Button>
        </li>
        <li>
          <ThemeToggler />
        </li>
        <li>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
