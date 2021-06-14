import React, { useEffect, useState } from "react";
import Board from "./Board";
import Chat from "./Chat";

const Game = (props) => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [tempBoard, setTempBoard] = useState(Array(9).fill(null));
	const [tempSquares, setTempSquares] = useState(Array(9).fill(null));

	useEffect(() => {
		props.socket.on("sendSquare", ({ currentBoard }) => {
			setTempBoard(currentBoard);
		});
	}, []);

	useEffect(() => {
		setBoard(tempBoard);
	}, [tempBoard]);

	useEffect(() => {
		setBoard(tempSquares);
		props.socket.emit("selectSquare", { currentBoard: tempSquares });
	}, [tempSquares]);

	const handleClick = (i) => {
		const squares = board.slice();

		squares[i] = props.userTurn ? "O" : "X";

		setTempSquares(squares);
	};
	// =======

	let status;
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
