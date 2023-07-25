import React from "react";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-transparent">
      <div className="border-t-4 border-green-700 border-solid rounded-full w-20 h-20 animate-spin"></div>
    </div>
  );
};
