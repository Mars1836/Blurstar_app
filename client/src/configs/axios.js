import axios from "axios";
import api from "./api";
const instance = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
