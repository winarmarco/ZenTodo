"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEdit } from "@/hooks/useEdit";
import { cn } from "@/lib/utils";

import { Check, Edit, MoreHorizontal, Trash2, Undo } from "lucide-react";
import React, { useState } from "react";
import type { Todo } from "@prisma/client";
import { EditTodoForm } from "./EditTodoForm";
import {
  deleteTodo,
  markAsCompleted,
  markAsNotCompleted,
} from "@/services/todo/actions";
import { useRouter } from "next/navigation";

const TodoCard = ({
  todo,
  isEditting,
}: {
  todo: Todo;
  isEditting: boolean;
}) => {
  const router = useRouter();
  const [isDone, setIsDone] = useState(todo.isCompleted);
  const [isFolded, setIsFolded] = useState(true);
  const { setTodoId } = useEdit();

  if (isEditting) return <EditTodoForm todo={todo} />;

  return (
    <div
      className={
        "flex flex-row gap-x-7 items-center w-full rounded-md border border-input bg-transparent px-3 py-3 text-base transition-shadow shadow-sm"
      }
    >
      <div className="w-full">
        <div
          className={cn(
            "w-full flex flex-col gap-y-4 hover:bg-muted rounded-md transition-all cursor-pointer",
            isDone ? "line-through" : ""
          )}
          onClick={() => {
            setIsFolded((prevValue) => !prevValue);
          }}
        >
          <h1 className="font-semibold text-lg px-3 py-1 cursor-text w-max">
            {todo.title}
          </h1>
          <p
            className={cn(
              "text-muted-foreground px-3 py-1 cursor-text",
              isFolded ? "line-clamp-3" : ""
            )}
          >
            {todo.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 h-full">
        <Button
          variant={isDone ? "ghost" : "secondary"}
          onClick={async () => {
            if (!isDone) {
              await markAsCompleted({ id: todo.id });
              setIsDone(true);
            } else {
              await markAsNotCompleted({ id: todo.id });
              setIsDone(false);
            }
          }}
          size={"icon"}
        >
          {isDone ? <Undo /> : <Check />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => {
                setTodoId(todo.id);
              }}
            >
              Edit
              <Edit />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex justify-between text-red-400"
              onClick={async () => {
                try {
                  await deleteTodo({ id: todo.id });
                  router.refresh();
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Delete
              <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TodoCard;
