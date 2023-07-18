import Link from "next/link";
import React from "react";

interface IScoreCardProps {
  _id: string;
  name: string;
  picture: string;
  highestScore: number;
  ranking: number;
}

export const ScoreCard = ({
  name,
  picture,
  highestScore,
  ranking,
  _id,
}: IScoreCardProps) => {
  return (
    <li>
      <Link
        className=" relative border-r-yellow-800 border-t-yellow-800 border-2 flex h-16 gap-1 border-gray-700 bg-gray-700 rounded p-2 "
        href={`/user/${_id}`}
      >
        <img
          src={picture}
          alt={name}
          className=" w-12 h-12 rounded-full aspect-auto"
        />
        <div className=" w-1 h-full bg-slate-600 "></div>
        <div className="flex flex-col">
          <span className="text-sm capitalize">{name}</span>
          <div className=" w-full h-1 bg-slate-600 "></div>
          <span>
            <small>Max:</small>{" "}
            <span className="w-4 h-4 text-xs bg-green-800 rounded p-1">
              {highestScore}
            </span>
          </span>
        </div>
        <span className="absolute right-0 top-0 text-sm  w-6 h-6 text-center  bg-yellow-800 ">
          {ranking + 1}º
        </span>
      </Link>
    </li>
  );
};
