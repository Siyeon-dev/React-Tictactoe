import dotenv from "dotenv";
import express from "express";
import socketIO from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketIO(server);

io.on("connection", (socket) => {
	socket.on("join", ({ roomName: room, userName: user }) => {
		socket.join(room);
		io.to(room).emmit("onConnect", `${user} 님이 입장했습니다.`);

		socket.on("onSend", (messageItem) => {
			io.to(room).emit("onReceive", messageItem);
		});

		socket.on("disconnect", () => {
			socket.leave(room);
			io.to(room).emit("onDisconnect", `${user} 님이 퇴장하셨습니다.`);
		});
	});
});

server.listen(PORT, () => console.log(`✅ Listening on POPRT : ${PORT} `));
