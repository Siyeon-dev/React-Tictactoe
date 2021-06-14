import React, { useEffect, useState } from "react";
import WaitingRoom from "./Components/WaitingRoom";
import Game from "./Components/Game";
import io from "socket.io-client";

const PORT = process.env.PORT || 4000;
const socket = io.connect(`http://localhost:${PORT}`);

const App = () => {
	const [joinRoom, setJoinRoom] = useState(false);
	const [state, setState] = useState({ userName: "", roomName: "" });
	const [userTurn, setUserTurn] = useState(null);
	let tempUserTurn = null;

	useEffect(() => {
		socket.on("onConnect", ({ isUserTurn }) => {
			// 실행 컨텍스트 문제
			if (tempUserTurn === null) {
				setUserTurn(isUserTurn);
				tempUserTurn = isUserTurn;
			}
		});
	}, []);

	useEffect(() => {
		console.log("isJoinedROOM? : " + joinRoom);
	}, [joinRoom]);

	return joinRoom === false ? (
		<WaitingRoom
			onRoomState={setJoinRoom}
			state={state}
			setState={setState}
			socket={socket}
		/>
	) : (
		<Game state={state} userTurn={userTurn} socket={socket} />
	);
};

export default App;
