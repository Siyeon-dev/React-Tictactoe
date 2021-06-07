import React, { useState } from "react";
import Board from "./Board";
import Chat from "./Chat";

const Game = (props) => {
	const [isPlayer, setIsPlayer] = useState(true);
	const [board, setBoard] = useState(Array(9).fill(null));

	const handleClick = (i) => {
		const squares = board.slice();

		// 이미 선택된 요소는 return
		if (squares[i] || calculateWinner(squares)) return;

		squares[i] = isPlayer ? "X" : "O";

		setBoard(squares);
		setIsPlayer(!isPlayer);
	};

	// =======
	// const winner = calculateWinner(history[history.length - 1].squares);
	const player = isPlayer ? "X" : "O";
	let status;

	// winner
	// 	? (status = "Winner : " + winner)
	// 	: (status = `Next Player : ${player}`);

	return (
		<div className='game-tictactoe'>
			<div>
				<h3>방번호 : {props.state.roomName}</h3>
				<h3>유저 이름 : {props.state.userName}</h3>
			</div>
			<div className='status'>{status}</div>
			<Board squares={board} onClick={handleClick} />
			<Chat state={props.state} socket={props.socket} />
		</div>
	);
};

export default Game;

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
