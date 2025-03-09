import React, { useState } from "react";
import "./App.css";
import Button from "./Button";

const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null); // State to store the winner

  const checkWinner = (newState) => {
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

    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (
        newState[a] !== null &&
        newState[a] === newState[b] &&
        newState[a] === newState[c]
      ) {
        return newState[a]; // Return the winner (X or O)
      }
    }
    return null;
  };

  const handleBlockClick = (index) => {
    if (state[index] !== null || winner) return; // Prevent playing after game ends

    const newState = [...state];
    newState[index] = currentPlayer;
    setState(newState);

    // Check for winner after updating state
    const gameWinner = checkWinner(newState);
    if (gameWinner) {
      setWinner(gameWinner);
      alert(`${gameWinner} won the game!`);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <>
      <h1>Welcome to Tic Tac Toe</h1>
      <div className="container">
        <div className="row">
          <Button onClick={() => handleBlockClick(0)} value={state[0]} />
          <Button onClick={() => handleBlockClick(1)} value={state[1]} />
          <Button onClick={() => handleBlockClick(2)} value={state[2]} />
        </div>
        <div className="row">
          <Button onClick={() => handleBlockClick(3)} value={state[3]} />
          <Button onClick={() => handleBlockClick(4)} value={state[4]} />
          <Button onClick={() => handleBlockClick(5)} value={state[5]} />
        </div>
        <div className="row">
          <Button onClick={() => handleBlockClick(6)} value={state[6]} />
          <Button onClick={() => handleBlockClick(7)} value={state[7]} />
          <Button onClick={() => handleBlockClick(8)} value={state[8]} />
        </div>
      </div>
      <button className="reset" onClick={() => { setState(Array(9).fill(null)); setWinner(null); setCurrentPlayer("X"); }}>
        Restart Game
      </button>
    </>
  );
};

export default App;
