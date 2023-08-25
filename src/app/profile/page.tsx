"use client";
import React, { useEffect, useState } from "react";
import { api } from "../services";
import Link from "next/link";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { ScoreColor } from "../components/scoreColor";
import { useRouter } from "next/navigation";
import { Loading } from "../components/Loading";

interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  nickname: string;
  picture: string;
  scores: number[];
  __v: number;
}

const Profile = () => {
  const [user, setUser] = useState({} as IUser);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: userData }: { data: IUser } = await api.get("profile");
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate.push("/login");
      }
    };
    getUserData();
  }, []);

  return (
    <main className="flex min-h-screen text-white flex-col gap-4 overflow-hidden bg-nature bg-cover pb-4">
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex  flex-col m-auto max-w-xl gap-4 w-screen ">
          <div className="flex  relative mx-4 gap-4">
            <div className=" relative w-20 aspect-square rounded-lg ">
              <img
                src={user.picture}
                alt={user.name}
                className=" absolute inset-0 w-full h-full object-cover"
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
      )}

      <div
        className={`-mb-8 mx-auto  max-w-7xl w-screen flex p-3 gap-2 ${
          isLoading && "mt-auto"
        }`}
      >
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
