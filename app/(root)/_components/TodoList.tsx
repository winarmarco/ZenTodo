"use client";
import React from "react";
import TodoCard from "./TodoCard";
import { useEdit } from "@/hooks/useEdit";
import { cn } from "@/lib/utils";

import type { Todo } from "@prisma/client";

const TodoList = ({ todos }: { todos: Todo[] }) => {
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

      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} isEditting={todoId === todo.id} />
      ))}
    </>
  );
};

export default TodoList;
