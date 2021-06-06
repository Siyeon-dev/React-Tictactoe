const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

io.on("connection", (socket) => {
	socket.on("onJoin", ({ roomName, userName }) => {
		socket.join(roomName);
		io.to(roomName).emit("onConnect", `${userName} 님이 접속하셨습니다. `);
	});

	socket.on("message", ({ message, userName }) => {
		io.emit("message", { message, userName });
	});

	socket.on("selectSquare", ({ currentBoard }) => {
		console.log(currentBoard);
		socket.broadcast.emit("sendSquare", { currentBoard });
	});
});

server.listen(4000, function () {
	console.log("listening on port 4000");
});
