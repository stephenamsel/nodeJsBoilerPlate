import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) =>{
socket.emit("connected")

// import array of receivable messages, set up like WS endpoints, from appropriate controllers
// keep dummy empty array for the moment in boilerplate

const ws_endpoints = ["health_check"];
ws_endpoints.forEach((ws_message) => 
    // preprocess to find appropriate handler
    socket.on(ws_message, (arg) =>{
    // set up response - execute handler to generate response
}));
socket.on()

})

