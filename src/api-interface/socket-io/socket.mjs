import { io } from "socket.io-client";

const socket = io("http://localhost:6415",{
    autoConnect: true,
    transports: ['websocket']
});


socket.on("connect", () => {
  console.log(socket.id);
});



export const appSocket=socket;

