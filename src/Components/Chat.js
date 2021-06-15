import React, { useState, useEffect } from "react";
import "./Chat.css";

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
			let isYourMessage = null;

			props.state.userName === v.userName
				? (isYourMessage = true)
				: (isYourMessage = false);

			return (
				<li key={index} className={`chat-log-${isYourMessage}`}>
					{v.message}
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
			<label className='chat-title' htmlFor='chat-input'>
				채팅 입력창
			</label>
			<ol className='chat-list'>{printMsg()}</ol>

			<div className='chat-form'>
				<input className='chat-input' onChange={handleMsgChange} />
				<button className='chat-submit' onClick={handleSendMsg}>
					전송
				</button>
			</div>
		</div>
	);
};

export default Chat;
