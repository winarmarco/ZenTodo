import { Todo } from "@prisma/client";
import { create } from "zustand";

type State = {
  todoId: Todo["id"] | null;
};

type Action = {
  setTodoId: (todoId: State["todoId"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useEdit = create<State & Action>((set) => ({
  todoId: null,
  setTodoId: (todoId) => set(() => ({ todoId })),
}));
