"use client";

import Image from "next/image";
import React from "react";
import gameStore from "@/store/gameStore";

const Selection = () => {
  const { handleSelection } = gameStore();

  const handleSelect = (symbol) => {
    handleSelection(symbol);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
      <div
        id="selection-box"
        className="relative w-[93%] max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_0_50px_rgba(255,255,255,0.08)] backdrop-blur-2xl"
      >
        <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        <h1 className="mb-3 text-center text-4xl font-black tracking-wide text-white">
          Choose Your Symbol
        </h1>

        <p className="mb-10 text-center text-sm text-white/60">
          Select X or O to start the game
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect("X")}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-8 transition-all duration-300 hover:scale-[1.03] hover:border-white/30 hover:bg-white/10"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>

            <div className="relative flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/X.png"
                width={80}
                height={80}
                alt="X"
                className="drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-110"
              />

              <h2 className="text-2xl font-bold text-white">Play as X</h2>
            </div>
          </button>

          <button
            onClick={() => handleSelect("O")}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-8 transition-all duration-300 hover:scale-[1.03] hover:border-white/30 hover:bg-white/10"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>

            <div className="relative flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/O.png"
                width={80}
                height={80}
                alt="O"
                className="drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-110"
              />

              <h2 className="text-2xl font-bold text-white">Play as O</h2>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;
