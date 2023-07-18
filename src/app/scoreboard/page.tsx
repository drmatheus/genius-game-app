"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { api } from "../services";
import { ScoreCard } from "../components/scoreCard";

interface IScoreCardProps {
  _id: string;
  name: string;
  picture: string;
  highestScore: number;
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

  console.log(scores);

  if (!scores.length) return null;

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-hidden bg-green-700">
      <Header />
      <div className="shadow-2xl p-1 w-[calc(100vw-1rem)] pb-4 bg-green-800 rounded m-auto mt-4">
        <h1 className="text-2xl font-semibold pl-2">Ranking</h1>
        <ul className="flex flex-col gap-3 p-2">
          {scores.map((s, i) => (
            <ScoreCard key={s._id} {...s} ranking={i} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Scoreboard;
