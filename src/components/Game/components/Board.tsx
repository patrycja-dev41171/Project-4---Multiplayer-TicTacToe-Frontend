import React, { useEffect, useState } from "react";
import { winningPatterns } from "../../../utils/game/winningPaterns";
import { socket } from "../../../socket-io/socket";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux-toolkit/store";
import "./Board.css";
import { BoardHeader } from "./BoardHeader";
import { useNavigate } from "react-router-dom";
import { setRoom_id } from "../../../redux-toolkit/features/user/user-slice";
import { BoardBtns } from "./BoardBtns";

export const Board = () => {
  const { room_id } = useSelector((store: StoreState) => store.user);
  const [gameMove, setGameMove] = useState(false);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [turn, setTurn] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [sendResult, setSendResult] = useState(false);
  const [render, setRender] = useState(false);
  const [points, setPoints] = useState({
    playerX: 0,
    playerO: 0,
  });
  const [btn, setBtn] = useState({
    btn1: true,
    btn2: false,
  });
  let navigate = useNavigate();

  const chooseSquare = async (square: number) => {
    if (result.state === "none") {
      if (player === turn && board[square] === "") {
        setTurn(player === "X" ? "O" : "X");
        const values = board;
        values[square] = player;
        setBoard(values);
        if (player === "X") {
          setPoints({
            ...points,
            playerX: points.playerX + 10,
          });
        } else {
          setPoints({
            ...points,
            playerO: points.playerO + 10,
          });
        }
        setGameMove(!gameMove);
      }
    }
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setPoints({
        playerX: points.playerX + 25,
        playerO: points.playerO + 25,
      });
      setResult({ winner: "none", state: "tie" });
      setSendResult(!sendResult);
    }
  };

  const checkWin = () => {
    let win = false;
    winningPatterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        win = true;
        if (firstPlayer === "X") {
          setPoints({
            ...points,
            playerX: points.playerX + 40,
          });
        } else {
          setPoints({
            ...points,
            playerO: points.playerO + 40,
          });
        }
        setResult({ winner: firstPlayer, state: "won" });
        setBtn({
          btn1: !btn.btn1,
          btn2: !btn.btn2,
        });
        setSendResult(!sendResult);
      }
    });
    if (!win) {
      checkIfTie();
    }
  };

  useEffect(() => {
    if (room_id === "") {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    socket.emit("game-results", {
      result: result,
      room: room_id,
      game_points: points,
    });
  }, [sendResult]);

  useEffect(() => {
    socket.emit("game-move", {
      board: board,
      room: room_id,
      player: player,
      game_points: points,
    });
  }, [gameMove]);

  useEffect(() => {
    checkWin();
  }, [render]);

  socket.on("other_user_move", (data: any) => {
    const currentPlayer = data.player === "X" ? "O" : "X";
    setPlayer(currentPlayer);
    setTurn(currentPlayer);
    setBoard(data.board);
    setPoints(data.game_points);
    setRender(!render);
  });

  socket.on("game-results", (data: any) => {
    setResult(data.result);
    setPoints(data.game_points);
    if (data.result.state !== "none") {
      setBtn({
        btn1: !btn.btn1,
        btn2: !btn.btn2,
      });
    }
  });

  socket.on("user-disconnect", (data: any) => {
    setRoom_id("");
    navigate("/home");
  });

  return (
    <div className="board__layout">
      <BoardHeader playerX={points.playerX} playerO={points.playerO} />

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

      {result.state === "none" ? (
        <p className="board__turn">{player === turn ? "Your move!" : ""}</p>
      ) : (
        <p className="board__turn">Winner: {result.winner}</p>
      )}
      {result.state === "tie" ? <p className="board__turn">TIE</p> : null}

      <BoardBtns
        btn1="Save the result"
        btn2="End the game"
        btn={btn}
        points={points}
        player={player}
      />
    </div>
  );
};
