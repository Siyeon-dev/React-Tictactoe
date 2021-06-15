import React from "react";
import dotenv from "dotenv";
import "./WaitingRoom.css";
dotenv.config();

const WaitingRoom = (props) => {
	const handleJoinRoom = () => {
		const { userName, roomName } = props.state;
		props.socket.emit("onJoin", { userName, roomName });
		props.onRoomState(true);
	};

	const handleUserName = (e) => {
		props.setState({
			userName: e.target.value,
			roomName: props.state.roomName,
		});
	};

	const handleRoomName = (e) => {
		props.setState({
			userName: props.state.userName,
			roomName: e.target.value,
		});
	};

	return (
		<div className='enter-game'>
			<h1 className='enter-game-title'>틱택토 🎮</h1>
			<h3 className='enter-game-desc'>누구나 쉽게 즐길 수 있는 게임</h3>
			<div className='enter-game-form'>
				<label htmlFor='user-name'>닉네임</label>
				<input
					className='user-name'
					onChange={handleUserName}
					placeholder='닉네임을 입력하세요'
				></input>
				<label htmlFor='room-name'>방번호</label>
				<input
					className='room-name'
					onChange={handleRoomName}
					placeholder='입장하실 방 번호를 입력하세요'
				></input>
				<button className='enter-room' onClick={handleJoinRoom}>
					시작하기 !
				</button>
			</div>
		</div>
	);
};

export default WaitingRoom;
