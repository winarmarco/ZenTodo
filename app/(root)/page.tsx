import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TodoList from "./_components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-10">My Todo</h1>

      <section className="flex w-full gap-x-4">
        <Input placeholder="Search Todo" />
        <Button>
          <Search />
        </Button>
      </section>

      <section className="flex flex-col gap-y-4 mt-10 mb-36">
        <TodoList />
      </section>
    </div>
  );
}
