"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEdit } from "@/hooks/useEdit";
import { cn } from "@/lib/utils";

import { Check, Edit, MoreHorizontal, Trash2, Undo, X } from "lucide-react";
import React, { useState } from "react";

const TodoCard = ({ id, isEditting }: { id: number; isEditting: boolean }) => {
  const [isDone, setIsDone] = useState(false);
  const [isFolded, setIsFolded] = useState(true);
  const { setTodoId } = useEdit();

  return (
    <div
      className={cn(
        "flex flex-row gap-x-7 items-center w-full rounded-md border border-input bg-transparent px-3 py-3 text-base transition-shadow",
        isEditting ? "shadow-lg z-10 bg-background " : "shadow-sm"
      )}
    >
      <div className="w-full">
        {!isEditting ? (
          <div
            className={cn(
              "w-full flex flex-col gap-y-4 hover:bg-zinc-50 rounded-md transition-all cursor-pointer",
              isDone ? "line-through" : ""
            )}
            onClick={() => {
              setIsFolded((prevValue) => !prevValue);
            }}
          >
            <h1 className="font-semibold text-lg px-3 py-1 cursor-text w-max">
              Title
            </h1>
            <p
              className={cn(
                "text-muted-foreground px-3 py-1 cursor-text",
                isFolded ? "line-clamp-3" : ""
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eveniet dicta autem, fuga impedit ea quia repudiandae voluptate
              molestias. Est quam sunt dicta officia, quo quod vel quasi fugit.
              Eos! In facilis minima quam inventore nostrum velit quasi sit
              quis, cum at nam repudiandae, a blanditiis enim consectetur eaque
              consequuntur dolorem incidunt. Accusamus rerum itaque a distinctio
              ipsum vero placeat. Maxime voluptatibus necessitatibus facilis,
              praesentium autem amet dicta hic! Et pariatur natus, dolores dicta
              laudantium totam sequi dignissimos dolorem inventore quasi, a quod
              quam assumenda ducimus aperiam. Similique, exercitationem quasi.
              Commodi ad eaque explicabo ut reiciendis. Quis maiores error
              reprehenderit deserunt id corrupti eius tenetur a nulla, officia
              dolores facilis placeat eveniet assumenda inventore consequatur,
              facere deleniti consequuntur fuga dignissimos! Sint quae quidem
              expedita veniam aperiam, temporibus illum beatae quaerat
              repudiandae? Ea doloribus exercitationem nostrum quod ad minus
              ratione veritatis delectus vel, aspernatur inventore porro esse
              facilis expedita, eos modi. Harum vero aut magnam alias facilis,
              sunt beatae. Facilis sunt deserunt inventore nihil maxime ab et
              eligendi aliquam! Exercitationem facilis rem amet, accusantium
              distinctio iste maiores quam soluta et impedit.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-y-4">
            <Input
              defaultValue={"Title"}
              className="font-semibold max-w-[250px] text-lg md:text-lg"
            />

            <Textarea
              ref={(textarea) => {
                if (textarea) {
                  textarea.style.height = "0px";
                  textarea.style.height = textarea.scrollHeight + "px";
                }
              }}
              rows={5}
              className="text-base md:text-base w-full resize-y overflow-hidden min-h-9 h-9"
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "0px";
                target.style.height = target.scrollHeight + "px";
              }}
              defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eveniet dicta autem, fuga impedit ea quia repudiandae voluptate molestias. Est quam sunt dicta officia, quo quod vel quasi fugit. Eos! In facilis minima quam inventore nostrum velit quasi sit quis, cum at nam repudiandae, a blanditiis enim consectetur eaque consequuntur dolorem incidunt. Accusamus rerum itaque a distinctio ipsum vero placeat. Maxime voluptatibus necessitatibus facilis, praesentium autem amet dicta hic! Et pariatur natus, dolores dicta laudantium totam sequi dignissimos dolorem inventore quasi, a quod quam assumenda ducimus aperiam. Similique, exercitationem quasi. Commodi ad eaque explicabo ut reiciendis. Quis maiores error reprehenderit deserunt id corrupti eius tenetur a nulla, officia dolores facilis placeat eveniet assumenda inventore consequatur, facere deleniti consequuntur fuga dignissimos! Sint quae quidem expedita veniam aperiam, temporibus illum beatae quaerat repudiandae? Ea doloribus exercitationem nostrum quod ad minus ratione veritatis delectus vel, aspernatur inventore porro esse facilis expedita, eos modi. Harum vero aut magnam alias facilis, sunt beatae. Facilis sunt deserunt inventore nihil maxime ab et eligendi aliquam! Exercitationem facilis rem amet, accusantium distinctio iste maiores quam soluta et impedit.`}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-x-4 h-full">
        {!isEditting ? (
          <>
            <Button
              variant={isDone ? "ghost" : "secondary"}
              onClick={() => {
                setIsDone((prevValue) => !prevValue);
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
                    setTodoId(id);
                  }}
                >
                  Edit
                  <Edit />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between text-red-400">
                  Delete
                  <Trash2 />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              variant={"default"}
              onClick={() => {
                setTodoId(null);
              }}
              size={"icon"}
            >
              {isDone ? <Undo /> : <Check />}
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
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
