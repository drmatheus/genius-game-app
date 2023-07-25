"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { api } from "@/app/services";
import { Modal, ModalLose, ModalWin } from "../modal";

interface IGG {
  isLogged: boolean;
}

export const GG = ({ isLogged }: IGG) => {
  const colorArray = ["blue", "yellow", "red", "green", ""];
  const [sequencie, setSequencie] = useState<Array<number>>([]);
  const [yourSequencie, setYourSequencie] = useState<Array<number>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentColor = colorArray[sequencie[currentIndex]];
  const [isDisabled, setIsDisabled] = useState(true);
  const [repeat, setRepeat] = useState(0);

  //LOSE MODAL
  const [isOpenLose, setIsOpenLose] = useState(false);
  const toogleModalLose = () => {
    setIsOpenLose(!isOpenLose);
  };

  // WIN MODAL
  const [isOpenWin, setIsOpenWin] = useState(false);
  const toogleModalWin = () => {
    setIsOpenWin(!isOpenWin);
  };

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
    setYourSequencie([]);
    setIsDisabled(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex > sequencie.length) {
          clearInterval(interval);
          setCurrentIndex(nextIndex);
          setIsDisabled(false);
        }
        return nextIndex;
      });
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [sequencie, repeat]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sequencie]);

  //WIN/LOSE
  useEffect(() => {
    if (sequencie.length > 0 && sequencie.length == yourSequencie.length) {
      const isEqual = sequencie.every((n, i) => n === yourSequencie[i]);
      if (isEqual) {
        setIsOpenWin(true);
      } else {
        if (isLogged) {
          const saveScores = async () => {
            await api.post("/scores", { score: sequencie.length - 3 });
          };
          saveScores();
        }
        setYourSequencie([]);
        setIsOpenLose(true);
      }
    }
  }, [yourSequencie]);

  return (
    <div className="flex flex-col w-screen max-w-lg justify-center overflow-hidden gap-4 p-4 m-auto  ">
      <div className="flex p-3 gap-3 bg-gray-transparent rounded-2xl">
        <Button
          text="Iniciar"
          onClick={() => {
            setTimeout(generateSequencie, 1000);
          }}
          className="border-2 border-gray-100 w-full   tracking-wider font-bold "
        />
        <Button
          text="Repetir"
          onClick={() => {
            setCurrentIndex(0);
            setRepeat(repeat + 1);
          }}
          className="border-2 border-gray-100 w-full  tracking-wider font-bold"
        />
      </div>

      <div className="bg-gray-transparent w-full p-2 rounded-3xl ">
        <div className="bg-gray-700 border-gray-700 border-[10px] flex  relative aspect-square rounded-full overflow-hidden flex-wrap justify-between gap-3">
          <Button
            text="0"
            onClick={() => setYourSequencie([...yourSequencie, 0])}
            disabled={isDisabled}
            className={`w-[calc(50%-6px)] min-w-[calc(50%-6px)] rounded-br-3xl bg-blue-700 aspect-square font-bold  ${
              currentColor === "blue" ? "animate-shinny duration-750" : ""
            }`}
          />

          <Button
            text="1"
            onClick={() => setYourSequencie([...yourSequencie, 1])}
            disabled={isDisabled}
            className={` w-[calc(50%-6px)] min-w-[calc(50%-6px)] rounded-bl-3xl bg-yellow-500 aspect-square font-bold ${
              currentColor === "yellow" ? "animate-shinny duration-750" : ""
            }`}
          />

          <Button
            text="2"
            onClick={() => setYourSequencie([...yourSequencie, 2])}
            disabled={isDisabled}
            className={` w-[calc(50%-6px)] min-w-[calc(50%-6px)] rounded-tr-3xl bg-red-700 aspect-square font-bold ${
              currentColor === "red" ? "animate-shinny duration-750" : ""
            }`}
          />

          <Button
            text="3"
            onClick={() => setYourSequencie([...yourSequencie, 3])}
            disabled={isDisabled}
            className={` w-[calc(50%-6px)] min-w-[calc(50%-6px)] rounded-tl-3xl bg-green-700 aspect-square font-bold ${
              currentColor === "green" ? "animate-shinny duration-750" : ""
            }`}
          />
        </div>
      </div>
      <span className="p-3 bg-gray-transparent rounded-2xl w-fit">{`Nivel atual: ${
        sequencie.length >= 4 ? sequencie.length - 3 : 1
      }`}</span>
      <Modal isOpen={isOpenLose} onClose={toogleModalLose}>
        <ModalLose
          generateSequencie={generateSequencie}
          isLogged={isLogged}
          sequencie={sequencie}
          toogleModal={toogleModalLose}
        />
      </Modal>

      <Modal isOpen={isOpenWin} onClose={toogleModalWin}>
        <ModalWin
          sequencie={sequencie}
          toogleModal={() => {
            toogleModalWin();
            setTimeout(() => {
              setSequencie([...sequencie, Math.floor(Math.random() * 4)]);
            }, 2000);
          }}
        />
      </Modal>
    </div>
  );
};
