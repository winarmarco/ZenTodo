"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Todo } from "@prisma/client";

export const getUncompletedTodo = async () => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    const uncompletedTodo = await prisma.todo.findMany({
      where: { authorId: session.user.id, isCompleted: false },
    });

    return uncompletedTodo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllTodo = async () => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    const allTodo = await prisma.todo.findMany({
      where: { authorId: session.user.id },
    });

    return allTodo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteTodo = async ({ id }: { id: Todo["id"] }) => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    await prisma.todo.delete({
      where: { authorId: session.user.id, id },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const queryTodo = async ({ query }: { query: string }) => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    const filteredTodo = await prisma.todo.findMany({
      where: {
        authorId: session.user.id,
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });

    return filteredTodo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateTodo = async ({
  todo,
}: {
  todo: Pick<Todo, "title" | "description" | "id">;
}) => {
  const { id, title, description } = todo;
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    await prisma.todo.update({
      where: {
        authorId: session.user.id,
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const markAsCompleted = async ({ id }: { id: Todo["id"] }) => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    await prisma.todo.update({
      where: {
        authorId: session.user.id,
        id: id,
      },
      data: {
        isCompleted: true,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const markAsNotCompleted = async ({ id }: { id: Todo["id"] }) => {
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    await prisma.todo.update({
      where: {
        authorId: session.user.id,
        id: id,
      },
      data: {
        isCompleted: false,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createTodo = async ({
  todo,
}: {
  todo: Pick<Todo, "title" | "description">;
}) => {
  const { title, description } = todo;
  try {
    const session = await auth();

    if (!session || !session.user?.id) throw new Error("Unauthenticated error");

    await prisma.todo.create({
      data: {
        title: title,
        description: description || "",
        authorId: session.user.id,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
