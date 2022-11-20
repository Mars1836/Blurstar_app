import axios from "axios";
import api from "./api";
const lct = window.location;
console.log(lct.origin);
console.log(process.env);
const instance = axios.create({
  baseURL: api.orgin,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
