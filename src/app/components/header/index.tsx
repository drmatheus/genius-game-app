"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownToogle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative w-screen p-2 flex justify-between bg-green-800 border-none shadow-lg shadow-green-950/25  ">
      <Link href={`/`} className="text-2xl font-semibold tracking-wider z-10 ">
        Genius Game
      </Link>
      <Button
        onClick={dropdownToogle}
        text="|||"
        className="rotate-90 font-bold"
      />
      {isOpen && (
        <div className="absolute right-2 top-10 flex flex-col gap-1 w-32 bg-white p-1 rounded">
          <Link
            href="register"
            className="bg-green-600 p-1 text-lg text-center rounded"
          >
            Cadastro
          </Link>
          <Link
            href="login"
            className="bg-green-600 p-1 text-lg text-center rounded"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};
