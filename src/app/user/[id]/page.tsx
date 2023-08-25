"use client";

import { Loading } from "@/app/components/Loading";
import { Button } from "@/app/components/button";
import { Header } from "@/app/components/header";
import { ScoreColor } from "@/app/components/scoreColor";
import { api } from "@/app/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IUserRetrieve {
  _id: string;
  name: string;
  password: string;
  email: string;
  nickname: string;
  picture: string;
  scores: number[];
  __v: number;
}

const Profile = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as IUserRetrieve);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        try {
          const { data: user }: { data: any } = await api.get(
            `users/${params.id}`
          );
          setUser(user);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <main className="flex min-h-screen text-white  flex-col gap-4 overflow-hidden bg-nature bg-cover pb-4">
      <Header />
      <div className="flex  flex-col m-auto max-w-xl gap-4 w-screen ">
        <div className="flex  relative mx-4 gap-4">
          <div className="relative flex min-w-[80px] min-h-[80px] aspect-square overflow-hidden rounded-lg">
            <img
              src={user.picture}
              alt={user.name}
              className="absolute flex inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="h-20 p-2 rounded-lg bg-gray-transparent flex flex-col gap-2 w-full ">
            <span className="text-xl font-bold first-letter:capitalize">
              {user.name}
            </span>
            <span className="text-lg font-bold">{user.nickname}</span>
          </div>
        </div>
        {user.scores.length > 0 && (
          <>
            <div className="flex py-2 flex-col p-2 justify-center rounded-lg relative mx-4 gap-4 bg-gray-transparent">
              <h1 className="text-xl font-bold">Todas as pontuações</h1>
              <ul className="flex bg-gray-transparent p-2 rounded-lg gap-2 flex-wrap w-fit  ">
                {user.scores.map((n, i) => {
                  if (!showMore) {
                    if (i > 21) return null;
                  }

                  return <ScoreColor score={n} key={i} />;
                })}
              </ul>
              <Button
                className="ml-auto text-xs -mt-2 underline"
                text={showMore ? "Mostrar menos" : "Mostra todos"}
                onClick={() => {
                  setShowMore(!showMore);
                }}
              />
            </div>

            <div className="flex  py-2 flex-col p-2 justify-center rounded-lg relative mx-4 gap-4 bg-gray-transparent">
              <h1 className="text-xl font-bold">Estatisticas</h1>

              <h2 className="-mb-3 font-bold">5 melhores pontuações</h2>
              <ul className="flex bg-gray-transparent p-2 rounded-lg gap-2 flex-wrap w-fit ">
                {user.scores.length >= 5 &&
                  user.scores
                    .sort((a, b) => b - a)
                    .slice(0, 5)
                    .map((n, i) => {
                      return (
                        <ScoreColor
                          className="w-14 text-3xl "
                          score={n}
                          key={i}
                        />
                      );
                    })}

                {user.scores.length < 5 &&
                  user.scores
                    .sort((a, b) => b - a)
                    .map((n, i) => {
                      return (
                        <ScoreColor
                          className="w-14 text-3xl "
                          score={n}
                          key={i}
                        />
                      );
                    })}
              </ul>
              <h2 className="-mb-3 font-bold">Pontuação media</h2>
              <div className="flex justify-center font-bold  text-2xl w-fit  aspect-square bg-gray-transparent py-2 px-1 rounded-lg gap-1 flex-wrap">
                <span>
                  {Math.floor(
                    user.scores.reduce((c: number, a: number) => c + a) /
                      user.scores.length
                  )}
                </span>
              </div>
              <h2 className="-mb-3 font-bold">Partidas jogadas</h2>
              <div className="flex justify-center font-bold  text-2xl w-fit  aspect-square bg-gray-transparent py-2 px-1 rounded-lg gap-1 flex-wrap">
                <span>{user.scores.length}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="-mb-8 mx-auto max-w-7xl w-screen flex p-3 gap-2">
        <Link
          href="/"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          GG
        </Link>
        <Link
          href="/scoreboard"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          Ranking
        </Link>
        <Link
          href="/about"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2"
        >
          Sobre
        </Link>
      </div>
    </main>
  );
};

export default Profile;
