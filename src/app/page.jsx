"use client";

import GameBoard from "@/components/GameBoard";
import Selection from "@/components/Selection";
import gameStore from "@/store/gameStore";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const { handleGameStart, AI, human, gameStarted } = gameStore();

  const startTheGame = () => {
    handleGameStart();
    gsap.to("#homepage", {
      opacity: 0,
      duration: 0.5,
      visibility: "hidden",
    });
    gsap.to("#gameboard", {
      scale: 1,
    });
  };

  return (
    <main className="min-h-dvh overflow-hidden relative bg-black">
      <div
        id="homepage"
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-center"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full" />

        <div className="absolute top-[8%] left-[6%] hidden md:block">
          <Image
            src="/images/X.png"
            width={260}
            height={260}
            alt="homeX"
            className="rotate-12 opacity-40"
          />
        </div>

        <div className="absolute bottom-[8%] right-[6%] hidden md:block">
          <Image
            src="/images/O.png"
            width={260}
            height={260}
            alt="homeO"
            className="opacity-40"
          />
        </div>

        <div className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-md">
          AI Powered Tic Tac Toe
        </div>

        <h1 className="max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl z-50">
          Challenge the{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Unbeatable AI
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-xl z-50">
          Play Tic Tac Toe against a powerful AI powered by the{" "}
          <span className="text-white font-semibold">Minimax Algorithm</span>.
          Every move matters. Can you force a draw?
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row z-50">
          <button
            className="group rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-pointer z-50"
            onClick={startTheGame}
          >
            Start Game
          </button>

          <button
            onClick={() => {
              router.push("https://github.com/NithishKanth/Tic-Tac-Toe");
            }}
            className="rounded-2xl border border-zinc-700 bg-zinc-900/60 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-zinc-800 cursor-pointer"
          >
            Learn More
          </button>
        </div>

        <p className="absolute bottom-8 text-sm tracking-wide text-zinc-600">
          Built with Next.js + AI Logic
        </p>
      </div>

      <div
        id="gameboard"
        className="absolute w-full h-full grid place-content-center left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 scale-0"
      >
        <GameBoard />
        {human === undefined && AI === undefined && gameStarted && (
          <Selection />
        )}
      </div>
    </main>
  );
};

export default page;
