"use client";

import { Header } from "./components/header";
import { GG } from "./components/gg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "./services";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get("/profile");
        router.push("/");
        setIsLogged(true);
      } catch (error) {
        console.log(error);
        setIsLogged(false);
      }
    };
    verifyToken();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-hidden bg-green-700 bg-nature bg-cover">
      <Header />
      <GG isLogged={isLogged} />
      <div className="-mb-4 mx-auto max-w-7xl w-screen flex p-3 gap-2">
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
}
