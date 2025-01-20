"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { todoSchema } from "@/services/todo/schema";
import { Textarea } from "@/components/ui/textarea";
import { createTodo } from "@/services/todo/actions";
import { useRouter } from "next/navigation";

const AddTodoForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof todoSchema>) {
    const { title, description } = values;
    try {
      await createTodo({
        todo: { title, description: description || "" },
      });

      return router.push("/");
    } catch (err) {
      console.log({ errClient: err });
      form.setError("root", {
        message: "Something went wrong! Please try again later",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Description of todo..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size={"lg"}
          disabled={form.formState.isSubmitting || form.formState.isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddTodoForm;
