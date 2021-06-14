import React, { useEffect, useState } from "react";
import Board from "./Board";
import Chat from "./Chat";

const Game = (props) => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [tempBoard, setTempBoard] = useState(Array(9).fill(null));
	const [tempSquares, setTempSquares] = useState(Array(9).fill(null));
	const [isYourTurn, setIsYourTurn] = useState();

	useEffect(() => {
		props.socket.on("sendSquare", ({ currentBoard, isGameTurn }) => {
			setTempBoard(currentBoard);
			console.log(isGameTurn);
			setIsYourTurn(isGameTurn);
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
		console.log(
			`userTurn : ${props.userTurn} , isYourTurn in handler : ${isYourTurn}`
		);

		if (
			squares[i] !== null ||
			isYourTurn !== props.userTurn ||
			calculateWinner(squares)
		)
			return;
		squares[i] = props.userTurn ? "O" : "X";

		setTempSquares(squares);
	};
	// =======
	return (
		<div className='game-tictactoe'>
			<div>
				<h3>방번호 : {props.state.roomName}</h3>
				<h3>유저 이름 : {props.state.userName}</h3>
			</div>
			<div className='status'>
				{calculateWinner(board)
					? `게임이 끝났습니다.`
					: props.userTurn === isYourTurn
					? "당신 차례입니다."
					: "상대방 차례입니다."}
			</div>
			<Board squares={board} onClick={handleClick} />
			<Chat state={props.state} socket={props.socket} />
		</div>
	);
};

function calculateWinner(squares) {
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
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}

export default Game;
