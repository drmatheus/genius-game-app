import React from "react";

export const Loading = () => {
  return (
    <div className="py-12 flex flex-col bg-gray-transparent w-[calc(100vw-1rem)] h-96 mx-auto rounded p-4 gap-2">
      <div className="animate-pulse text-xl w-fit m-auto">Carregando...</div>
    </div>
  );
};
