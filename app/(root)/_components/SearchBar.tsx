import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { Button } from "@/components/ui/button";

const SearchBar = ({ query }: { query: string }) => {
  return (
    <Form action="/" scroll={false} className="flex w-full gap-x-4">
      <Input
        name="query"
        type="search"
        defaultValue={query}
        placeholder="Search Todo"
      />
      <Button type="submit">
        <Search />
      </Button>
    </Form>
  );
};

export default SearchBar;
