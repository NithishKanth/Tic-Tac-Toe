<div align="center">

# 🎮 Tic-Tac-Toe

### Challenge the Unbeatable AI

A modern implementation of the classic **Tic-Tac-Toe** game built with **Next.js**, **React**, **JavaScript**, **Tailwind CSS**, **Shadcn UI**, and **Zustand**. Challenge an AI powered by the **Minimax Algorithm**, designed to always make the optimal move.

</div>

---

# 📖 About

This project is a modern recreation of the classic **Tic-Tac-Toe** game where players compete against an AI that uses the **Minimax Algorithm** to determine the best possible move.

The application is built entirely on the client side with **no backend or database**. All game logic, state management, and AI calculations are handled locally, resulting in a fast and responsive gameplay experience.

The project also demonstrates clean component architecture, centralized state management, and algorithm implementation using modern React development practices.

---

# ✨ Features

- 🎮 Classic Tic-Tac-Toe gameplay
- 🤖 Play against an unbeatable AI
- 🧠 AI powered by the Minimax Algorithm
- ⚡ Instant move evaluation
- 🏆 Automatic winner detection
- 🤝 Draw detection
- 📱 Fully responsive design
- 🎨 Modern UI with Shadcn UI
- ⚙️ Centralized state management using Zustand

---

# 🛠️ Tech Stack

| Technology   | Purpose              |
| ------------ | -------------------- |
| Next.js      | React Framework      |
| React        | User Interface       |
| JavaScript   | Programming Language |
| Tailwind CSS | Styling              |
| Shadcn UI    | UI Components        |
| Zustand      | State Management     |

---

# 🧠 State Management

The application uses **Zustand** to manage the entire game state through a centralized **Game Store**.

The store is responsible for:

- Managing the game board
- Tracking player turns
- Handling player moves
- Executing AI moves
- Resetting the game state
- Synchronizing UI updates

Using Zustand keeps the application simple, predictable, and avoids unnecessary prop drilling between components.

---

# 🤖 Minimax Algorithm

The AI opponent is powered by the **Minimax Algorithm**, a recursive decision-making algorithm commonly used in two-player strategy games.

For every turn, the algorithm:

1. Explores every possible game state.
2. Simulates both the player's and AI's future moves.
3. Evaluates each possible outcome.
4. Selects the move that maximizes the AI's chances of winning while minimizing the player's chances.

Because every possible board state is evaluated before making a decision, the AI always chooses the optimal move and cannot be defeated.

---

# 📂 Project Structure

```text
src/
│
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   └── ui/
│         ├── GameBoard.jsx
│         ├── ResultComponent.jsx
│         └── Selection.jsx
│
└── store/
    └── gameStore.js

```

---

# 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/NithishKanth/tic-tac-toe.git
```

### Navigate to the project directory

```bash
cd tic-tac-toe
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 💡 How It Works

- The player selects a symbol and starts the game.
- Each player move updates the board through the Zustand Game Store.
- After the player's turn, the AI analyzes every possible move using the Minimax Algorithm.
- The AI selects the optimal move and updates the board.
- The game continuously checks for a winner or draw after every move.
- Once the game ends, the appropriate result screen is displayed.

---

# 📚 What I Learned

Developing this project helped me gain practical experience in:

- Building applications with Next.js and React
- Managing application state with Zustand
- Implementing the Minimax Algorithm
- Organizing scalable project architecture
- Creating reusable UI components
- Designing responsive interfaces with Tailwind CSS
- Separating business logic from UI components

---

# 🙌 Acknowledgements

Special thanks to the open-source community and the creators of:

- Next.js
- React
- Tailwind CSS
- Shadcn UI
- Zustand

Their tools made this project possible.

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Made with ❤️ by **Nithish Kanth**

</div>
