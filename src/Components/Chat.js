import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const socket = io.connect(`http://localhost:${PORT}`);

const Chat = () => {
	const [state, setState] = useState({ message: "", userName: "g" });
	const [chat, setChat] = useState([]);
	const [arrayState, setArrayState] = useState([]);

	useEffect(() => {
		socket.on("message", ({ message, userName }) => {
			setChat([...chat, { message, userName }]);
		});
	}, []);

	useEffect(() => {
		setArrayState([...arrayState, ...chat]);
	}, [chat]);

	const onTextChange = (e) => {
		setState({ message: e.target.value, userName: "g" });
	};

	const onMessageSubmit = (e) => {
		const { message, userName } = state;
		socket.emit("message", { message, userName });
		setState({ message: "", userName });
	};

	return (
		<div>
			<input onChange={onTextChange}></input>
			<button onClick={onMessageSubmit}>전송</button>
			<ol>
				{arrayState.map((v) => {
					return <div>{`message : ${v.message}`}</div>;
				})}
			</ol>
		</div>
	);
};

export default Chat;
