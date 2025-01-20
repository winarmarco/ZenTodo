"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import AddTodoForm from "./_components/AddTodoForm";

const AddPage = () => {
  const navigation = useRouter();

  return (
    <div className="flex flex-col mx-4 h-screen items-center justify-center mt-[-100px]">
      <main className="w-full max-w-xl">
        <Button
          className="flex items-center p-0 gap-x-1 text-muted-foreground text-sm hover:no-underline"
          variant="link"
          size="sm"
          onClick={() => {
            navigation.back();
          }}
        >
          <ArrowLeft size={14} />
          Back
        </Button>
        <div className="flex flex-col gap-y-4 mt-4">
          <h1 className="text-3xl font-bold my-4">Add Todo</h1>
          <AddTodoForm />
        </div>
      </main>
    </div>
  );
};

export default AddPage;
