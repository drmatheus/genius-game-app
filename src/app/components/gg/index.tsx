"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "../button";
import { api } from "@/app/services";

interface IGG {
  isLogged: boolean;
}

export const GG = ({ isLogged }: IGG) => {
  const colorArray = ["blue", "yellow", "red", "green", ""];
  const [sequencie, setSequencie] = useState<Array<number>>([]);
  const [yourSequencie, setYourSequencie] = useState<Array<number>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentColor = colorArray[sequencie[currentIndex]];

  //GENERETE SEQUENCIE
  const generateSequencie = () => {
    const sequencieArray = [];
    while (sequencieArray.length < 4) {
      sequencieArray.push(Math.floor(Math.random() * 4));
    }
    setSequencie(sequencieArray);
  };

  //RUN SEQUENCIE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        console.log(
          "nextIndex > sequencie.length=",
          nextIndex > sequencie.length,
          nextIndex,
          sequencie.length
        );
        console.log(
          "prevIndex > sequencie.length=",
          prevIndex > sequencie.length,
          prevIndex,
          sequencie.length
        );
        if (nextIndex > sequencie.length && prevIndex > sequencie.length) {
          clearInterval(interval);
          setCurrentIndex(nextIndex);
        }
        return nextIndex;
      });
    }, 750);
    return () => {
      clearInterval(interval);
    };
  }, [sequencie]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sequencie]);

  //WIN/LOSE
  if (sequencie.length > 0 && sequencie.length == yourSequencie.length) {
    if (sequencie.every((n, i) => n === yourSequencie[i])) {
      console.log("ganhou, nextRound");
      console.log(`level ${sequencie.length - 3} beggin`);
      setYourSequencie([]);
      setTimeout(() => {
        setSequencie([...sequencie, Math.floor(Math.random() * 4)]);
      }, 2000);
    } else {
      if (isLogged) {
        api.post("/scores", { score: sequencie.length - 3 });
      }
      console.log("perdeu, starting again...");
      setYourSequencie([]);
      setTimeout(generateSequencie, 2000);
    }
  }

  return (
    <>
      <div className="flex p-3 gap-3 bg-gray-transparent m-2 rounded">
        <Button
          text="Iniciar"
          onClick={() => {
            setTimeout(generateSequencie, 1000);
          }}
          className="border-2 border-gray-100 w-full  tracking-wider font-bold "
        />
        <Button
          text="Repetir"
          onClick={() => setSequencie(sequencie)}
          className="border-2 border-gray-100 w-full  tracking-wider font-bold"
        />
      </div>

      <span className="p-3 -mb-28 mt-10 bg-gray-transparent m-2 rounded w-fit">{`Nivel atual: ${
        sequencie.length >= 4 ? sequencie.length - 3 : 1
      }`}</span>

      <div className="bg-gray-700 border-gray-700 border-[10px] flex w-11/12 relative aspect-square m-auto rounded-full overflow-hidden flex-wrap justify-between gap-3 ">
        <Button
          text="0"
          onClick={() => setYourSequencie([...yourSequencie, 0])}
          className={`min-w-[48%] max-w-[50%] rounded-br-3xl bg-blue-700 aspect-square font-bold ${
            currentColor === "blue" ? "animate-shinny duration-750" : ""
          }`}
        />

        <Button
          text="1"
          onClick={() => setYourSequencie([...yourSequencie, 1])}
          className={`min-w-[48%] max-w-[50%] rounded-bl-3xl bg-yellow-500 aspect-square font-bold ${
            currentColor === "yellow" ? "animate-shinny duration-750" : ""
          }`}
        />

        <Button
          text="2"
          onClick={() => setYourSequencie([...yourSequencie, 2])}
          className={`min-w-[48%] max-w-[50%] rounded-tr-3xl bg-red-700 aspect-square font-bold ${
            currentColor === "red" ? "animate-shinny duration-750" : ""
          }`}
        />

        <Button
          text="3"
          onClick={() => setYourSequencie([...yourSequencie, 3])}
          className={`min-w-[48%] max-w-[50%] rounded-tl-3xl bg-green-700 aspect-square font-bold ${
            currentColor === "green" ? "animate-shinny duration-750" : ""
          }`}
        />
      </div>
    </>
  );
};
