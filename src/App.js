import React, { useState } from "react";
import Board from "./Components/Board";

const App = () => {
	const [isPlayer, setIsPlayer] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);
	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null),
		},
	]);

	const handleClick = (i) => {
		const nowHistory = history.slice(0, stepNumber + 1);
		const current = nowHistory[nowHistory.length - 1];
		const squares = current.squares.slice();

		// 이미 선택된 요소는 return
		if (squares[i] || calculateWinner(squares)) return;

		squares[i] = isPlayer ? "X" : "O";

		setHistory(
			nowHistory.concat([
				{
					squares,
				},
			])
		);

		setIsPlayer(!isPlayer);
		setStepNumber(nowHistory.length);
	};

	// =======
	const winner = calculateWinner(history[history.length - 1].squares);
	const current = history[stepNumber];
	const player = isPlayer ? "X" : "O";
	let status;

	console.log(current);

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

	winner
		? (status = "Winner : " + winner)
		: (status = `Next Player : ${player}`);

	return (
		<div className='game-tictactoe'>
			<div className='status'>{status}</div>
			<Board squares={current.squares} onClick={handleClick} />
			<ol className='record-game'>{moves}</ol>
		</div>
	);
};

export default App;

// ==================================
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
