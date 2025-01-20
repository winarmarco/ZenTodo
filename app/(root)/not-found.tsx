import React from "react";

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold text-center">{"404 Not Found :("}</h1>
      <p className="text-center text-muted-foreground">
        The page that you are looking is not found!
      </p>
    </div>
  );
};

export default NotFound;
