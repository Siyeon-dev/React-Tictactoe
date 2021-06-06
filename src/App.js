import React, { useEffect, useState } from "react";
import WaitingRoom from "./Components/WaitingRoom";
import Game from "./Components/Game";
import io from "socket.io-client";

const PORT = process.env.PORT || 4000;
const socket = io.connect(`http://localhost:${PORT}`);

const App = () => {
	const [joinRoom, setJoinRoom] = useState(false);
	const [state, setState] = useState({ userName: "", roomName: "" });

	useEffect(() => {
		console.log("joinedROOM? : " + joinRoom);
	}, [joinRoom]);

	return joinRoom === false ? (
		<WaitingRoom
			onRoomState={setJoinRoom}
			state={state}
			setState={setState}
			socket={socket}
		/>
	) : (
		<Game state={state} socket={socket} />
	);
};

export default App;
