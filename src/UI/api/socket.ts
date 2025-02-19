import { io } from "socket.io-client";
import { CSGOGSI } from "csgogsi";
import { apiUrl } from "./api";

export const socket = io(`${apiUrl}`);
export const GSI = new CSGOGSI();

socket.on("update", (data) => {
  GSI.digest(data);
});
