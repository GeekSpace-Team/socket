import { io } from "socket.io-client";
import {getLocalServerIp, server_ip} from "../api/AxiosInstance.mjs";

const socket = io(getLocalServerIp(),{
    autoConnect: true,
    transports: ['websocket']
});

const onlineSocket = io(server_ip,{
  autoConnect: true,
  transports: ['websocket']
});


socket.on("connect", () => {
  console.log(socket.id);
});

onlineSocket.on("connect", () => {
  console.log(socket.id);
});



export const appSocket=socket;
export {onlineSocket};

