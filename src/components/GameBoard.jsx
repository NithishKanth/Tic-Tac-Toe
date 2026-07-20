import gameStore from "@/store/gameStore";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ResultComponent from "./ResultComponent";
import { useGSAP } from "@gsap/react";

const GameBoard = () => {
  const {
    board,
    handleGameChange,
    human,
    AI,
    playerTurn,
    computerTurn,
    winner,
    handleGameOver,
    gameStarted,
  } = gameStore();

  const itemsRef = useRef([]);

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  function getAllAvailableMoves(board) {
    return board
      ?.map((cell, index) => (cell == "" ? index : null))
      .filter((val) => val !== null);
  }

  function checkWinner(board, player) {
    for (const pattern of winPatterns) {
      const isWinner = pattern.every((index) => board[index] === player);

      if (isWinner) {
        return pattern;
      }
    }
    return null;
  }

  function isDraw(board) {
    return board.every((cell) => cell !== "");
  }
  const minimax = (board, depth, isMaximizing, AI, human) => {
    if (checkWinner(board, AI)) {
      return 10 - depth;
    }
    if (checkWinner(board, human)) {
      return depth - 10;
    }

    if (isDraw(board)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let index of getAllAvailableMoves(board)) {
        if (board[index] !== "") continue;

        board[index] = AI;
        let score = minimax(board, depth + 1, false, AI, human);
        board[index] = "";
        bestScore = Math.max(score, bestScore);
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let index of getAllAvailableMoves(board)) {
        if (board[index] !== "") continue;

        board[index] = human;
        let score = minimax(board, depth + 1, true, AI, human);
        board[index] = "";
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };
  const getBestMove = (board, AI, human) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let index of getAllAvailableMoves(board)) {
      if (board[index] !== "") continue;

      board[index] = AI;
      let score = minimax(board, 0, false, AI, human);
      board[index] = "";

      if (score > bestScore) {
        bestScore = score;
        move = index;
      }
    }
    return move;
  };
  useEffect(() => {
    if (!computerTurn || winner != null || !gameStarted) return;
    const aiMove = getBestMove(board, AI, human);
    if (aiMove >= 0 && aiMove < 9) {
      handleGameChange(aiMove, AI);
    }
  }, [computerTurn]);

  useEffect(() => {
    gsap.to("#icon", {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }, [board]);

  useEffect(() => {
    const aiPattern = checkWinner(board, AI);

    if (aiPattern) {
      const winPattern = aiPattern?.map((box) => itemsRef.current[box]);
      gsap.to(winPattern, {
        borderRadius: "24px",
        scale: 1.3,
        duration: 0.2,
        stagger: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
      handleGameOver(AI);
    }

    const humanPattern = checkWinner(board, human);

    if (humanPattern) {
      gsap.to(humanPattern, {
        borderRadius: "24px",
        scale: 1.3,
        duration: 0.2,
        stagger: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
      handleGameOver(human);
    }

    if (isDraw(board)) {
      handleGameOver(null);
      gsap.to(
        "#drawcomponent",
        {
          scale: 0.5,
          opacity: 0,
          y: 80,
          rotateX: -25,
          filter: "blur(10px)",
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
        },
      );
    }
  }, [board]);

  return (
    <div className="relative grid grid-rows-3 grid-cols-3 w-fit place-content-center gap-4 mx-auto z-50">
      {board?.map((box, index) => {
        return (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`text-white text-center size-[100px] ms:size-[150px] lg:size-[180px] relative cursor-pointer z-50`}
            onClick={() => {
              if (!playerTurn || !gameStarted) return;
              if (box != "") return;
              handleGameChange(index, human);
            }}
          >
            {box === "X" && (
              <Image
                id="icon"
                src={"/images/X.png"}
                fill
                alt="X"
                className="relative z-10 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)] scale-0"
              />
            )}
            {box === "O" && (
              <Image
                id="icon"
                src={"/images/O.png"}
                fill
                alt="O"
                className="relative z-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] scale-0"
              />
            )}
          </div>
        );
      })}
      <div className="absolute h-full w-full flex items-center justify-evenly">
        <div className="w-[16px] bg-white h-full rounded-xl"></div>
        <div className="w-[16px] bg-white h-full rounded-xl"></div>
      </div>
      <div className="absolute h-full w-full flex flex-col items-center justify-evenly">
        <div className="h-[16px] bg-white w-full rounded-xl"></div>
        <div className="h-[16px] bg-white w-full rounded-xl"></div>
      </div>
      {winner !== undefined && (
        <ResultComponent winner={winner} human={human} AI={AI} />
      )}
    </div>
  );
};

export default GameBoard;
