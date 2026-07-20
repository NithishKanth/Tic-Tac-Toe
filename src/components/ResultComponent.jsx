"use client";

import React from "react";
import { Button } from "./ui/button";
import { Home, RotateCcw } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import gameStore from "@/store/gameStore";
import { useRouter } from "next/navigation";

const GameLost = () => {
  return (
    <div>
      <h1 className="text-center text-5xl mt-4 font-black tracking-widest text-white">
        YOU LOST
      </h1>
      <p className="mt-3 text-center text-gray-400">
        The AI wins this round. Ready for a rematch?
      </p>
    </div>
  );
};

const GameWin = () => {
  return (
    <div>
      <h1 className="text-center mt-4 text-5xl font-black tracking-widest text-white">
        YOU WIN
      </h1>
      <p className="mt-3 text-center text-gray-400">
        You defeated the unbeatable AI.
      </p>
    </div>
  );
};

const MatchDraw = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-black tracking-widest text-white">
        MATCH DRAW
      </h1>
      <p className="mt-3 text-center text-gray-400">
        A perfectly balanced game! Neither player managed to secure the win.
      </p>
    </div>
  );
};

const ResultComponent = ({ winner, human }) => {
  const { handleReTry } = gameStore();
  const router = useRouter();

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
      <div className="relative w-[92%] max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,.5)]">
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
        <div className="mt-6 flex items-center gap-3">
          <Button
            onClick={handleReTry}
            className="h-14 flex-1 rounded-2xl bg-cyan-500 text-lg font-semibold hover:bg-cyan-400"
          >
            <RotateCcw className="scale-150 mr-1" />
            Play Again
          </Button>

          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="h-14 flex-1 bg-green-500 rounded-2xl text-lg font-semibold hover:bg-green-400"
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
