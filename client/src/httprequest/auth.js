import configs from "../configs";
import axios from "axios";
import instance from "../configs/axios";
const apiRoute = {
  login: `/auth/login`,
  register: `/user`,
};
const login = async (username, password) => {
  const tokenOj = await instance.post(`${apiRoute.login}`, {
    username,
    password,
  });
  return tokenOj;
};
const authRequest = {
  login,
};
export default authRequest;
