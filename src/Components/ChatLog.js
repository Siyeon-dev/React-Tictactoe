import React, { useEffect, useState } from "react";

const ChatLog = (props) => {
	const [message, setMessage] = useState("");
	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleClick = () => {
		props.socket.emit("sendMessage", { message });
		setMessage("");
	};

	useEffect(() => {
		props.socket.on("userName", (msg) => {
			console.log(msg);
		});

		props.socket.on("receivedMessage", (msg) => {
			console.log(msg);
		});
	}, []);

	return (
		<div>
			<input onChange={handleChange}></input>
			<button onClick={handleClick}>전송</button>
		</div>
	);
};

export default ChatLog;
