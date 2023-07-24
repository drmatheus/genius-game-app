import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { animated, useTransition } from "react-spring";
import { Button } from "../button";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const transition = useTransition(isOpen, {
    from: { transform: "translateX(100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
    config: { duration: 300 },
  });

  return (
    <>
      {transition(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: "absolute",
                zIndex: 10,
                alignSelf: "center",
                margin: "auto",
                display: "flex",
              }}
              className="modal"
            >
              <div className="flex gap-2 p-4 flex-col max-w-[calc(100vw-2rem)] bg-green-700 w-fit rounded-lg justify-center items-center">
                {children}
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

interface IModalLoseProps {
  sequencie: number[];
  toogleModal: () => void;
  generateSequencie: () => void;
  isLogged: boolean;
}

export const ModalLose = ({
  sequencie,
  toogleModal,
  generateSequencie,
  isLogged,
}: IModalLoseProps) => {
  return (
    <>
      <div className="bg-green-900 w-full p-4 flex gap-2 flex-col rounded">
        <h1 className="w-fit h-fit text-3xl rounded mx-auto">
          Sequencia errada!
        </h1>
        <span className="rounded  text-lg w-fit mx-auto">
          Você alcançou o nivel: {sequencie.length - 2}
        </span>
        <div className="w-fist flex gap-2 mt-4 mx-auto">
          <Button
            className="bg-gray-transparent border-2 px-2 border-white"
            text="Fechar"
            onClick={toogleModal}
          />
          <Button
            className="bg-gray-transparent border-2 px-2"
            text="Jogar novamente"
            onClick={() => {
              toogleModal();
              setTimeout(generateSequencie, 600);
            }}
          />
        </div>
      </div>

      {!isLogged && (
        <div className="bg-green-900 w-full p-4 flex gap-2 flex-col rounded  ">
          <h2>Faça login e salve sua pontuações!</h2>
          <Link
            className="-mt-2 mb-4 w-fit underline rounded border-white"
            href="/login"
          >
            Fazer Login
          </Link>

          <h2>Não tem uma conta?</h2>
          <Link
            className="-mt-2 w-fit underline rounded border-white"
            href="/login"
          >
            Registrar-se
          </Link>
        </div>
      )}
    </>
  );
};

interface IModalWinProps {
  sequencie: number[];
  toogleModal: () => void;
}

export const ModalWin = ({ sequencie, toogleModal }: IModalWinProps) => {
  return (
    <>
      <div className="bg-green-900 w-full p-4 flex gap-2 flex-col rounded">
        <h2 className="w-fit h-fit text-3xl rounded mx-auto">
          Sequencia Correta!
        </h2>
        <h3 className="rounded  text-lg w-fit mx-auto">
          Proximo nivel: {sequencie.length - 2}
        </h3>
      </div>
      <Button
        className="bg-gray-transparent border-2 px-2 border-white"
        text="Proximo"
        onClick={toogleModal}
      />
    </>
  );
};
