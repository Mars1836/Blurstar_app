import io from "socket.io-client";
import configs from "../configs";
const socket = io(configs.api.orgin);
export default socket;
