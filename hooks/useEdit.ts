import { create } from "zustand";

type State = {
  todoId: number | null;
};

type Action = {
  setTodoId: (todoId: State["todoId"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useEdit = create<State & Action>((set) => ({
  todoId: null,
  setTodoId: (todoId) => set(() => ({ todoId })),
}));
