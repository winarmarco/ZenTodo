"use client";
import React from "react";
import TodoCard from "./TodoCard";
import { useEdit } from "@/hooks/useEdit";
import { cn } from "@/lib/utils";

const TodoList = () => {
  const { todoId, setTodoId } = useEdit();

  return (
    <>
      <div
        className={cn(
          "fixed w-screen h-screen bg-black top-0 left-0 transition-opacity",
          todoId ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={() => {
          setTodoId(null);
        }}
      ></div>

      {[5, 6, 7, 8].map((value, index) => (
        <TodoCard
          key={`key-${index}`}
          id={value}
          isEditting={todoId === value}
        />
      ))}
    </>
  );
};

export default TodoList;
