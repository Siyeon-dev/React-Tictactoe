import React, { useEffect, useState } from "react";
import Game from "./Components/Game";
import WaitingRoom from "./Components/WaitingRoom";

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
		/>
	) : (
		<Game />
	);
};

export default App;
