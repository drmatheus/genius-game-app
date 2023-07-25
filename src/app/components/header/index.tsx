"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { api } from "@/app/services";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get("/profile");
        setIsLogged(true);
      } catch (error) {
        setIsLogged(false);
      }
    };
    verifyToken();
  }, []);

  const dropdownToogle = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  return (
    <header className=" p-2   bg-green-800  shadow-lg  py-4 ">
      <div className="relative m-auto w-full items-center flex justify-between border-none shadow-green-950/25 sm:max-w-screen-xl">
        <Link
          href={`/`}
          className="text-2xl text-white h-fit font-semibold tracking-wider z-10 "
        >
          Genius Game
        </Link>
        <Button
          onClick={dropdownToogle}
          text="|||"
          className="rotate-90 font-bold sm:hidden"
        />
        {isOpen && (
          <div className="absolute right-2 top-12 flex flex-col gap-2 w-32 bg-gray-transparent p-2 rounded z-10 ">
            {isLogged ? (
              <>
                <Link
                  href="/profile"
                  className="bg-green-600 p-1 text-lg text-center rounded font-bold"
                >
                  Perfil
                </Link>
                <Button
                  text="Sair"
                  onClick={() => {
                    Cookies.remove("geniusGame@token");
                    router.push("/login");
                  }}
                  className="bg-green-600 p-1 text-lg text-center w-full rounded font-bold"
                />
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="bg-green-600 p-1 text-lg text-center rounded font-bold"
                >
                  Cadastro
                </Link>
                <Link
                  href="/login"
                  className="bg-green-600 p-1 text-lg text-center rounded font-bold"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}

        <div className="gap-2 p-2 rounded hidden sm:flex ">
          {isLogged ? (
            <>
              <Link
                href="/profile"
                className="bg-green-600 p-1 px-4  text-base text-center rounded font-bold"
              >
                Perfil
              </Link>
              <Button
                text="Sair"
                onClick={() => {
                  Cookies.remove("geniusGame@token");
                  router.push("/login");
                }}
                className="bg-green-600 p-1 px-4  text-base text-center rounded font-bold"
              />
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-green-600 p-1 px-4 text-base text-center rounded font-bold"
              >
                Cadastro
              </Link>
              <Link
                href="/login"
                className="bg-green-600 p-1 px-4  text-base text-center rounded font-bold"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
