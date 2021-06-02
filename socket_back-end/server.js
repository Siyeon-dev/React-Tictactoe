const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;

var app = require("http").createServer(function (req, res) {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4004/");
	res.setHeader("Access-Control-Request-Method", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
	res.setHeader("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS" || req.method === "GET") {
		res.writeHead(200);
		res.end();
		return;
	}
});

var io = require("socket.io")(app);

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

app.listen(PORT);
