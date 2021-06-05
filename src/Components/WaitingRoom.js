import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const socket = io.connect(`http://localhost:${PORT}`);

const WaitingRoom = () => {
	const [state, setState] = useState({ userName: "", roomName: "" });

	useEffect(() => {}, []);

	const onJoinRoom = ({ roomName, userName }) => {
		socket.emit("onJoin", { roomName, userName });
	};

	const handleUserName = (e) => {
		setState({
			userName: e.target.value,
			roomName: state.roomName,
		});
	};

	const handleRoomName = (e) => {
		setState({
			userName: state.userName,
			roomName: e.target.value,
		});
	};

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<div>
			<input onChange={handleUserName}></input>
			<input onChange={handleRoomName}></input>
			<button>전송</button>
		</div>
	);
};

export default WaitingRoom;
