import React, { useEffect, useState } from "react";
import dotenv from "dotenv";

dotenv.config();

const WaitingRoom = (props) => {
	useEffect(() => {
		props.socket.on("onConnect", (msg) => {
			console.log(msg);
		});
	}, []);

	const handleJoinRoom = () => {
		const { userName, roomName } = props.state;
		props.socket.emit("onJoin", { userName, roomName });
		console.log(userName, roomName);
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
		<div>
			<label htmlFor='user-name'>닉네임</label>
			<input className='user-name' onChange={handleUserName}></input>
			<label htmlFor='room-name'>방번호</label>
			<input className='room-name' onChange={handleRoomName}></input>
			<button onClick={handleJoinRoom}>전송</button>
		</div>
	);
};

export default WaitingRoom;
