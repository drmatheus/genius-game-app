"use client";

import { Header } from "./components/header";
import { GG } from "./components/gg";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-hidden bg-green-700 bg-nature ">
      <Header />
      <GG isLogged={isLogged} />
      <div className="flex p-3 gap-1">
        <Link
          href="/scoreboard"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2 text-base -mb-4"
        >
          Ranking
        </Link>
        <Link
          href="/about"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2 text-base -mb-4"
        >
          Sobre
        </Link>
        <Link
          href="/scoreboard"
          className="border-2 border-gray-100 bg-white text-green-800 font-bold rounded p-2 text-base -mb-4"
        >
          Outra coisa
        </Link>
      </div>
    </main>
  );
}
