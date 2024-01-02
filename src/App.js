import { useState } from "react";

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null); // Board へリフトアップした

  return(
    <button
      className="square"
      onClick={onSquareClick}
    >
      { value }
    </button>
  )
}


function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true); // 次の手を設定・更新する変数 xIsNext を定義する（初期値 true） →　Game へリフトアップした
  // const [squares, setSquares] = useState(Array(9).fill(null)); // Board でリフトアップした →　Game へリフトアップした

  function handleClick(i) {
    // 同じマス目を使わない処理：マス目に値が入っていたら、何もせず返す
    // いずれかが勝者した場合
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); // squares 配列のコピーを作る
    // nextSquares[i] = "X";              // 渡ってきた square番号を参照して、新しい配列の同番号にXを代入する
    // 手を2手作る
    if(xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquares(nextSquares);             // マス目の更新：その配列を新しい配列として更新する
    // setXIsNext(!xIsNext);                // 先手・後手の更新：手は交互に変わるため、自分（true/false）とは逆の値に設定を更新する
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return(
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}


export default function Game() {
  const [xIsNext, setXIsNext] = useState(true); // 次の手を設定・更新する変数 xIsNext を定義する（初期値 true）
  const [history, setHistory] = useState([Array(9).fill(null)]); // Board からリフトアップした（1試合1手毎に Square 配列の履歴が入る。9手分）
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* xIsNext:先・後攻、 squares：新しい手（配列）、onPlay：配列のどのインデックス要素を変えるか*/}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}