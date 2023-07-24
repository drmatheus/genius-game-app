"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { api } from "../services";
import { ScoreCard } from "../components/scoreCard";
import Link from "next/link";

interface IScoreCardProps {
  _id: string;
  name: string;
  picture: string;
  highestScore: number;
  timesPlayed: number;
}

const Scoreboard = () => {
  const [scores, setScores] = useState([] as IScoreCardProps[]);

  useEffect(() => {
    const getScores = async () => {
      const { data: scores }: { data: IScoreCardProps[] } = await api.get(
        "/scores"
      );
      setScores(scores);
    };
    getScores();
  }, []);

  if (!scores.length) return null;

  return (
    <main className="flex flex-col  min-h-screen w-screen  gap-4 overflow-hidden bg-green-700 ">
      <Header />
      <div className="shadow-2xl  w-[calc(100%-1rem)] pb-4 p-1 bg-green-800 rounded mx-auto sm:max-w-screen-xl sm:w-full ">
        <h1 className="text-2xl font-semibold pl-2">Ranking</h1>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 p-2">
          {scores.map((s, i) => (
            <ScoreCard key={s._id} {...s} ranking={i} />
          ))}
        </ul>
      </div>
      <div className="-mb-4 mx-auto max-w-7xl w-screen flex p-3 gap-2">
        <Link
          href="/"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          GG
        </Link>
        <Link
          href="/about"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          Sobre
        </Link>
        <Link
          href="/scoreboard"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          Outra coisa
        </Link>
      </div>
    </main>
  );
};

export default Scoreboard;
