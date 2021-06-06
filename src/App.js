import React, { useEffect, useState } from "react";
import Game from "./Components/Game";
import WaitingRoom from "./Components/WaitingRoom";

const App = () => {
	const [joinRoom, setJoinRoom] = useState(false);

	useEffect(() => {
		console.log("joinedROOM? : " + joinRoom);
	}, [joinRoom]);
	return joinRoom === false ? (
		<WaitingRoom onRoomState={setJoinRoom} />
	) : (
		<Game />
	);
};

export default App;
