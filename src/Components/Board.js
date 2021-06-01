import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
	const [isPlayer, setIsPlayer] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);
	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null),
		},
	]);

	const renderSquares = (i) => {
		return (
			<Square
				value={history[history.length - 1].squares[i]}
				onClick={() => handleClick(i)}
			/>
		);
	};

	const handleClick = (i) => {
		
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		// 이미 선택된 요소는 return
		if (squares[i] || calculateWinner(squares)) return;

		squares[i] = isPlayer ? "X" : "O";
		setHistory(
			history.concat([
				{
					squares,
				},
			])
		);
		console.log(history);
		setIsPlayer(!isPlayer);
	};

	const moves = history.map((step, move) => {
		const desc = move ? "Go to move #" + move : "Go to game start";

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	const jumpTo = (step) => {
		setStepNumber(step);
		setIsPlayer(step % 2 === 0);
	};

	// =======================================

	const winner = calculateWinner(history[history.length - 1].squares);
	const player = isPlayer ? "X" : "O";
	let status;

	winner
		? (status = "Winner : " + winner)
		: (status = `Next Player : ${player}`);
	return (
		<div className='board'>
			<div className='board-row'>
				{renderSquares(0)}
				{renderSquares(1)}
				{renderSquares(2)}
			</div>
			<div className='board-row'>
				{renderSquares(3)}
				{renderSquares(4)}
				{renderSquares(5)}
			</div>
			<div className='board-row'>
				{renderSquares(6)}
				{renderSquares(7)}
				{renderSquares(8)}
			</div>

			<div className='game-info'>
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

export default Board;

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let line of lines) {
		const [a, b, c] = line;

		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			// 승자 찾으면, 해당 플레이어 반환
			return squares[a];
		}
	}
	// 승자가 없으면 null
	return null;
};
