import React from "react";
import { Header } from "../components/header";
import Link from "next/link";

const About = () => {
  return (
    <main className="flex min-h-screen text-white  flex-col gap-4 overflow-hidden bg-nature bg-cover ">
      <Header />
      <div className="flex flex-col bg-green-800 p-4 rounded-lg gap-4 max-w-[90vw] mx-auto">
        <h1 className="text-2xl font-semibold">
          Sobre o Jogo &ldquo;Genius&ldquo;
        </h1>

        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 max-w-[90vw] mx-auto">
          <h1 className="text-xl font-semibold">Descrição:</h1>
          <p>
            O jogo &ldquo;Genius&ldquo; é um desafio de memória clássico que
            envolve cores e sequências. Os jogadores devem memorizar uma
            sequência crescente de cores e, em seguida, repeti-la corretamente.
            O objetivo é ver até onde você pode chegar sem cometer erros.
          </p>
        </div>
        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 max-w-[90vw] mx-auto">
          <h1 className="text-xl font-semibold">Surgimento:</h1>
          <p>
            O jogo &ldquo;Genius&ldquo; foi lançado no Brasil em 1980 pela
            Estrela, sendo o primeiro jogo eletrônico comercializado no país.
            Esta versão brasileira foi baseada no jogo &ldquo;Simon&ldquo; da
            Hasbro, dos Estados Unidos, e marcou o início de uma série de
            brinquedos eletrônicos populares da Estrela nos anos 80, incluindo
            outros como Pégasus e Colossus.
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-green-800 p-4 rounded-lg gap-4 max-w-[90vw] mx-auto">
        <h1 className="text-2xl font-semibold">Sobre o Projeto</h1>
        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 max-w-[90vw] mx-auto">
          <h1 className="text-xl font-semibold">Desenvolvimento:</h1>
          <p>
            Esta aplicação foi desenvolvida por mim, Matheus Dávila, como parte
            do meu aprendizado e prática na área de desenvolvimento web
            full-stack.
          </p>
        </div>

        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 max-w-[90vw] w-full mx-auto">
          <h1 className="text-xl font-semibold">Tecnologias Utilizadas:</h1>

          <ul>
            <li>
              <p>Frontend:</p>
              <ul className="list-inside list-disc">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind</li>
              </ul>
            </li>
            <li>
              <p>Backend:</p>
              <ul className="list-inside list-disc">
                <li>Node</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Mongoose</li>
                <li>Zod</li>
                <li>Jsonwebtoken</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 max-w-[90vw] mx-auto">
          <h1 className="text-xl font-semibold">GitHub e LinkedIn:</h1>
          <p>
            Você pode conferir o código-fonte deste projeto e outros projetos
            relacionados no meu perfil do GitHub:
            <a
              className="italic text-blue-300"
              href="https://github.com/drmatheus"
            >
              drmatheus
            </a>
            . <br /> Para se conectar comigo profissionalmente, sinta-se à
            vontade para visitar o meu perfil no LinkedIn:
            <a
              className="italic text-blue-300"
              href="https://www.linkedin.com/in/matheusrdavila/"
            >
              Matheus Dávila
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col bg-gray-transparent p-2 rounded-lg gap-2 min-w-full mx-auto">
          <h1 className="text-xl font-semibold">Objetivo do Projeto:</h1>
          <p>
            O principal objetivo deste projeto foi aprofundar meus conhecimentos
            em tecnologias específicas, incluindo o uso do MongoDB com o
            Mongoose, além de explorar o React e o Next.js na construção de
            interfaces de usuário dinâmicas e responsivas.
          </p>
        </div>
      </div>
      <div className="-mb-4 mx-auto mt-auto max-w-7xl w-screen flex p-3 gap-2">
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
      </div>
    </main>
  );
};

export default About;
