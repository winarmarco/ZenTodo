import React from "react";
import Logo from "./Logo";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import SignIn from "./SignIn";
import { auth } from "@/lib/auth";
import UserAvatar from "./UserAvatar";
// import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="max-w-7xl mx-auto px-4 h-[100px] flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <ul className="flex items-center gap-x-4">
        {session && session.user && (
          <li>
            <Button variant="outline" asChild>
              <Link href={"/add"}>
                Add Todo <Plus />
              </Link>
            </Button>
          </li>
        )}
        <li>
          <ThemeToggler />
        </li>
        <li className="flex items-center">
          {session && session.user ? (
            <UserAvatar src={session.user.image || ""} />
          ) : (
            <SignIn />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
