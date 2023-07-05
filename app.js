require('dotenv').config();
const express = require("express"); // access
const socket = require("socket.io");
const cors = require('cors');
const {PORT} = process.env;
const app = express(); //Initiliazed and server ready

app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000"
}));
let port = process.env.PORT || 5000;
//port
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
})

let io = socket(server);
io.on("connection", (socket) => {
    console.log("Made socket connection");
    //Recieved data
    socket.on("beginPath", (data) => {
        //data from frontend
        //Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        //data from frontend
        //Now transfer to all connected computers
        io.sockets.emit("drawStroke", data);

    })

    socket.on("undoRedoCanvas", (data) => {
        //data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("undoRedoCanvas", data);
    })
})