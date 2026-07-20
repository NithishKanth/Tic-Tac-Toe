import { create } from "zustand";

const gameStore = create((set) => ({
  gameStarted: false,
  winner: undefined,
  human: undefined,
  AI: undefined,
  board: ["", "", "", "", "", "", "", "", ""],
  playerTurn: undefined,
  computerTurn: undefined,
  startGame: () => set(() => ({ gameStarted: true })),
  endGame: () => set(() => ({ gameStarted: false })),
  replay: () => set(() => ({ board: ["", "", "", "", "", "", "", "", ""] })),
  handleGameStart: () =>
    set(() => ({
      gameStarted: true,
    })),
  handleGameChange: (index, cell) =>
    set((state) => ({
      board: state.board?.map((_, place) =>
        place == index && _ === "" ? cell : _,
      ),
      playerTurn: !state.playerTurn,
      computerTurn: !state.computerTurn,
    })),
  handleGameOver: (player) =>
    set(() => ({
      winner: player,
      gameStarted: false,
    })),
  handleSelection: (player) =>
    set(() => ({
      human: player,
      AI: player === "X" ? "O" : "X",
      playerTurn: player === "X" ? true : false,
      computerTurn: player === "X" ? false : true,
    })),
  handleReTry: () =>
    set(() => ({
      board: ["", "", "", "", "", "", "", "", ""],
      human: undefined,
      AI: undefined,
      winner: undefined,
      gameStarted: true,
    })),
}));

export default gameStore;
