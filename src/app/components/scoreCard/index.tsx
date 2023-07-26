import Link from "next/link";
import React from "react";

interface IScoreCardProps {
  _id: string;
  name: string;
  picture: string;
  highestScore: number;
  ranking: number;
  timesPlayed: number;
}

export const ScoreCard = ({
  name,
  picture,
  highestScore,
  ranking,
  _id,
  timesPlayed,
}: IScoreCardProps) => {
  return (
    <li>
      <Link
        className="relative border-r-yellow-800 w-full border-t-yellow-800 text-white border-2 flex h-24 gap-2 border-gray-700 bg-gray-700 rounded p-2 "
        href={`/user/${_id}`}
      >
        <img
          src={picture}
          alt={name}
          className=" w-20 h-20 rounded-full aspect-square"
        />
        <div className=" w-1 h-full bg-slate-600 "></div>
        <div className="flex flex-col gap-2">
          <span className="text-lg capitalize">{name}</span>
          <div className=" w-full h-1 bg-slate-600 hidden sm:block"></div>
          <div className="flex gap-4">
            <span className="flex items-center justify-center">
              <small>Pontuação Máxima:</small>
              <span className="w-6 h-6 text-xs bg-green-800 rounded p-1">
                {highestScore}
              </span>
            </span>
            <span className="flex gap-1 items-center justify-center ">
              <small>Total de Partidas:</small>
              <span className="ml-1 flex w-6 h-6 text-xs justify-center bg-green-800 rounded p-1">
                <span>{timesPlayed}</span>
              </span>
            </span>
          </div>
        </div>
        <span className="absolute right-0 top-0 text-sm pt-[6px] w-8 h-8 text-center  bg-yellow-800 ">
          {ranking + 1}º
        </span>
      </Link>
    </li>
  );
};
