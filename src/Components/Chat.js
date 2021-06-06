import React, { useState, useEffect } from "react";
import { Socket } from "socket.io";

const Chat = (props) => {
	const [message, setMessage] = useState("");
	const [historyMsg, setHistoryMsg] = useState([]);
	const [recMsg, setRecMsg] = useState({ message: "", userName: "" });

	useEffect(() => {
		props.socket.on("message", ({ message, userName }) => {
			setRecMsg({ message, userName });
		});
	}, []);

	useEffect(() => {
		if (recMsg.message !== "") {
			setHistoryMsg([
				...historyMsg,
				{ message: recMsg.message, userName: recMsg.userName },
			]);
		}
	}, [recMsg]);

	const printMsg = () => {
		return historyMsg.map((v, index) => {
			return (
				<li key={index}>
					message: {v.message} user:{v.userName}{" "}
				</li>
			);
		});
	};

	const handleSendMsg = () => {
		const msg = {
			message,
			userName: props.state.userName,
		};
		props.socket.emit("message", msg);
		setMessage("");
	};

	const handleMsgChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<div className='chat'>
			<label htmlFor='chat-input'>채팅 입력창</label>
			<input className='chat-input' onChange={handleMsgChange} />
			<button onClick={handleSendMsg}>전송</button>
			<ol>{printMsg()}</ol>
		</div>
	);
};

export default Chat;
