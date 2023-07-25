import React from "react";

export const ScoreColor = ({
  score,
  className,
}: {
  score: number;
  className?: string;
}) => {
  const defineColor = (n: number) => {
    if (n < 5) {
      return "bg-yellow-500";
    }

    if (n <= 5) {
      return "bg-yellow-700";
    }

    if (n <= 10) {
      return "bg-green-600";
    }

    if (n <= 15) {
      return "bg-green-800";
    }

    if (n <= 20) {
      return "bg-orange-600";
    }

    if (n <= 25) {
      return "bg-orange-700";
    }

    if (n <= 30) {
      return "bg-red-500";
    }

    if (n <= 35) {
      return "bg-red-500";
    }

    if (n > 35 && n < 50) {
      return "bg-gray-950";
    }

    if (n > 50) {
      return "bg-gray-950 border-gold border-2 text-gold";
    }
  };

  return (
    <li
      className={`${defineColor(
        score
      )} flex min-w-[2.5rem] w-fit bg-golden p-2 aspect-square rounded justify-center items-center font-bold  ${className} `}
    >
      <span>{score}</span>
    </li>
  );
};
