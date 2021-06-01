import React from "react";
import Square from "./Square";

const Board = (props) => {
	const renderSquares = (i) => {
		return (
			<Square
				value={props.board.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	};

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
		</div>
	);
};

export default Board;
