import React, { useEffect, useState } from "react";
import "./Board.css";
import { winningPatterns } from "../../../utils/game/winningPaterns";

export const Board = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [render, setRender] = useState(false);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const chooseSquare = async (square: number) => {
    if (player === turn && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");
      setPlayer(player === "X" ? "O" : "X")
      const values = board;
      values[square] = player;
      await setBoard(values);
      setRender(!render);
    }
  };

  const checkWin = () => {
    winningPatterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
        console.log(result.winner)
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "none", state: "tie" });
    }
  };

  useEffect(() => {
    checkWin();
    checkIfTie()
  }, [render]);

  return (
    <div className="board">
      <div id="0" className="board__element" onClick={() => chooseSquare(0)}>
        <p>{board[0]}</p>
      </div>
      <div id="1" className="board__element" onClick={() => chooseSquare(1)}>
        {board[1]}
      </div>
      <div id="2" className="board__element" onClick={() => chooseSquare(2)}>
        {board[2]}
      </div>
      <div id="3" className="board__element" onClick={() => chooseSquare(3)}>
        {board[3]}
      </div>
      <div id="4" className="board__element" onClick={() => chooseSquare(4)}>
        {board[4]}
      </div>
      <div id="5" className="board__element" onClick={() => chooseSquare(5)}>
        {board[5]}
      </div>
      <div id="6" className="board__element" onClick={() => chooseSquare(6)}>
        {board[6]}
      </div>
      <div id="7" className="board__element" onClick={() => chooseSquare(7)}>
        {board[7]}
      </div>
      <div id="8" className="board__element" onClick={() => chooseSquare(8)}>
        {board[8]}
      </div>
    </div>
  );
};
