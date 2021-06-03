import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import dotenv from "dotenv";
import ChatLog from "./ChatLog";
dotenv.config();

const Chat = () => {
	const PORT = process.env.PORT || 4002;
	const [currentSocket, setCurrentSocket] = useState();

	const options = {
		rememberUpgrade: true,
		transports: ["websocket"],
		secure: true,
		rejectUnauthorized: false,
	};
	// 해당 방법으로 hook을 사용해 소켓을 관리하면
	// 렌더링에 따른 소켓 연결 상태를 예측 가능하다.
	useEffect(() => {
		setCurrentSocket(socketIOClient(`http://localhost:${PORT}/`, options));
	}, []);

	return <div>{currentSocket ? <ChatLog socket={currentSocket} /> : ""}</div>;
};

export default Chat;
