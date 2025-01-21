import { Button } from "@/components/ui/button";
import TodoList from "./_components/TodoList";
import { auth, signIn } from "@/lib/auth";
import { getAllTodo, queryTodo } from "@/services/todo/actions";
import SearchBar from "./_components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  console.log("Welcome to the Landing Page");
  const session = await auth();

  if (!session || !session.user?.id)
    return (
      <div className="w-full flex flex-col gap-4 items-center justify-center mt-96">
        <h1 className="text-3xl font-bold text-center">
          {"Welcome to ZenTodo!"}
        </h1>
        <p className="text-center text-muted-foreground">
          Your no 1. app for Todo Management
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("auth0");
          }}
          className="mt-6"
        >
          <Button type="submit" variant="default" size="lg">
            Get Started
          </Button>
        </form>
      </div>
    );

  const query = (await searchParams).query?.trim();
  // Query todo if there are any quries
  let todos;
  if (query) {
    todos = await queryTodo({ query: query });
  } else {
    todos = await getAllTodo();
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-10">My Todo</h1>

      <SearchBar query={query || ""} />

      <section className="flex flex-col gap-y-4 mt-10 mb-36">
        <TodoList todos={todos} />
      </section>
    </div>
  );
}
