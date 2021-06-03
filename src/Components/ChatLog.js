import React, { useEffect, useState } from "react";

const ChatLog = (props) => {
	const [userName, setUserName] = useState([""]);
	const [message, setMessage] = useState("");
	const [messageLog, setMessageLog] = useState([]);
	const [tempMsg, setTempMsg] = useState([]);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleClick = () => {
		props.socket.emit("sendMessage", { message, userName });
		setMessage("");
	};

	useEffect(() => {
		props.socket.on("userName", (msg) => {
			setUserName(msg);
		});

		props.socket.on("receivedMessage", ({ message, userName }) => {
			// 전혀 tempMsg 불러오지 못한다... 왜?
			setMessageLog([...tempMsg, { message, userName }]);
		});
	}, []);

	useEffect(() => {
		messageLog && setTempMsg(tempMsg.concat([messageLog]));
		console.log(tempMsg);
	}, [messageLog]);

	return (
		<div>
			<input onChange={handleChange}></input>
			<button onClick={handleClick}>전송</button>
		</div>
	);
};

export default ChatLog;
