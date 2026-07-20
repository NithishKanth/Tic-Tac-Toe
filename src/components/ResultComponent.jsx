"use client";

import React from "react";
import { Button } from "./ui/button";
import { Home, RotateCcw } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import gameStore from "@/store/gameStore";

const GameLost = () => {
  return (
    <div>
      <h1 className="mt-3 text-center text-3xl sm:mt-4 sm:text-5xl font-black tracking-wider sm:tracking-widest text-white">
        YOU LOST
      </h1>
      <p className="mt-2 sm:mt-3 text-center text-sm sm:text-base text-gray-400 px-2">
        The AI wins this round. Ready for a rematch?
      </p>
    </div>
  );
};

const GameWin = () => {
  return (
    <div>
      <h1 className="mt-3 text-center text-3xl sm:mt-4 sm:text-5xl font-black tracking-wider sm:tracking-widest text-white">
        YOU WIN
      </h1>
      <p className="mt-2 sm:mt-3 text-center text-sm sm:text-base text-gray-400 px-2">
        You defeated the unbeatable AI.
      </p>
    </div>
  );
};

const MatchDraw = () => {
  return (
    <div>
      <h1 className="text-center text-3xl sm:text-4xl font-black tracking-wider sm:tracking-widest text-white">
        MATCH DRAW
      </h1>
      <p className="mt-2 sm:mt-3 text-center text-sm sm:text-base text-gray-400 px-2">
        A perfectly balanced game! Neither player managed to secure the win.
      </p>
    </div>
  );
};

const ResultComponent = ({ winner, human }) => {
  const { handleReTry } = gameStore();

  useGSAP(() => {
    gsap.fromTo(
      "#resultComponent",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.9,
        ease: "back.out(1.7)",
      },
    );
  });
  return (
    <div
      id="resultComponent"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xl"
    >
      <div className="relative w-[92%] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/90 p-5 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,.5)]">
        <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-100/20 blur-[100px]" />
        {winner === null ? (
          <MatchDraw />
        ) : (
          <>
            {winner !== undefined && winner === human ? (
              <GameWin />
            ) : (
              <GameLost />
            )}
          </>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
          <Button
            onClick={handleReTry}
            className="py-3 sm:h-14 flex-1 rounded-2xl bg-cyan-500 text-lg font-semibold hover:bg-cyan-400"
          >
            <RotateCcw className="scale-150 mr-1" />
            Play Again
          </Button>

          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="py-3 sm:h-14 flex-1 bg-green-500 rounded-2xl text-lg font-semibold hover:bg-green-400"
          >
            <Home className="scale-150 mr-1" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
