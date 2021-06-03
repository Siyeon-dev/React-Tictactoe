const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const app = require("http").createServer((req, res) => {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Request-Method", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
	res.setHeader("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS" || req.method === "GET") {
		res.writeHead(200);
		res.end();
		return;
	}
});

const io = require("socket.io")(app);
let count = 0;

io.on("connection", (socket) => {
	console.log(`User Connected : ${socket.id}`);
	const name = "user" + count++;
	io.to(socket.id).emit("userName", name);

	socket.on("disconnect", () => {
		console.log("user disconnected: ", socket.id);
	});

	socket.on("sendMessage", (msg) => {
		console.log(msg);
		io.emit("receivedMessage", msg);
	});
});

app.listen(PORT);
