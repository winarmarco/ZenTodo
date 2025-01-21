"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEdit } from "@/hooks/useEdit";
import { updateTodo } from "@/services/todo/actions";
import { Todo } from "@prisma/client";
import { Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { omit } from "lodash";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { todoSchema } from "@/services/todo/schema";
import { useRouter } from "next/navigation";

export const EditTodoForm = ({ todo }: { todo: Todo }) => {
  const { setTodoId } = useEdit();
  const router = useRouter();
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  });

  async function onSubmit(values: z.infer<typeof todoSchema>) {
    const { title, description } = values;
    try {
      // if (!session.data || !session.data.user.id) return router.push("/");

      await updateTodo({
        todo: { id: todo.id, title, description: description || "" },
      });
      return router.refresh();
    } catch (err) {
      console.log(err);
      form.setError("root", {
        message: "Something went wrong! Please try again later",
      });
    }
  }

  return (
    <div className="z-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-7 items-center w-full rounded-md border border-input bg-background px-3 py-3 text-base transition-shadow shadow-lg z-10">
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="font-semibold max-w-[250px] text-lg md:text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    const remainingField = omit(field, "ref");

                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={5}
                            className="text-base md:text-base w-full"
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = "0px";
                              target.style.height = target.scrollHeight + "px";
                            }}
                            ref={(textarea) => {
                              if (textarea) {
                                textarea.style.height = "0px";
                                textarea.style.height =
                                  textarea.scrollHeight + "px";
                              }
                            }}
                            placeholder="Description of todo..."
                            {...remainingField}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-x-4 h-full">
              <Button
                variant={"default"}
                onClick={async () => {
                  try {
                    await updateTodo({ todo });
                    setTodoId(null);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                size={"icon"}
              >
                <Check />
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setTodoId(null);
                }}
                size={"icon"}
              >
                <X />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
