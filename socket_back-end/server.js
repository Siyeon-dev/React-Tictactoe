import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`✅ Listening on POPRT : ${PORT} `));
