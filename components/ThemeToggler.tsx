"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
        variant={"ghost"}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
};
