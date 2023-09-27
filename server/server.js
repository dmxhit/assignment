require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
}); //socket instance

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//connect with database
connectDB();


socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on("message", (data) => {
    console.log(data)
    socketIO.emit("messageResponse", data);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes
app.use("/api/auth", require("./auth/route"));


//coonect server
const server = http.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

