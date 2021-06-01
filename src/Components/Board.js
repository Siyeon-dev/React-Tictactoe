import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
	const [isPlayer, setIsPlayer] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	const renderSquares = (i) => {
		return <Square value={squares[i]} onClick={() => handleClick(i)} />;
	};

	const handleClick = (i) => {
		const winner = calculateWinner(squares);
		let newArray = [...squares];

		// 이미 선택된 요소는 return
		if (newArray[i] || winner) return;

		newArray[i] = isPlayer ? "X" : "O";
		console.log(newArray);

		setSquares(newArray);
		setIsPlayer(!isPlayer);
	};

	const winner = calculateWinner(squares);
	const player = isPlayer ? "X" : "O";
	let status;

	winner
		? (status = "Winner : " + winner)
		: (status = `Next Player : ${player}`);
	return (
		<div className='board'>
			<div className='status'>{status}</div>
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
