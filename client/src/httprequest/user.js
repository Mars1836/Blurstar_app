import configs from "../configs";
import instance from "../configs/axios";
import axios from "axios";
const apiRoute = {
  findAll: `/api/users`,
  findById: `/api/users/find/`,
  findExceptId: `/api/users/except/`,
  createUser: `/auth/register`,
  getUsersLike: `/api/users/userslike/`,
  userUploadAvatar: `/api/users/uploadavatar/`,
};
const findAll = async () => {
  const user = await instance.get(`${apiRoute.findAll}`);
  console.log(user);
  return user;
};
const findById = async (id) => {
  if (id) {
    const user = await instance.get(`${apiRoute.findById + id}`);
    return user;
  }
};
const findExceptId = async (id, payload) => {
  const user = await instance.get(`${apiRoute.findExceptId + id}`, {
    params: payload,
  });
  return user;
};
const createUser = async (data) => {
  const user = await instance.post(`${apiRoute.createUser}`, {
    ...data,
  });
  return user;
};
const getUsersLike = async (postId) => {
  const users = await instance.get(`${apiRoute.getUsersLike + postId}`);
  return users;
};
const userUploadAvatar = async (base64EncodedImage, userId) => {
  const t = await instance.post(`${apiRoute.userUploadAvatar + userId}`, {
    image: base64EncodedImage,
  });
  return t;
};
const userRequest = {
  findAll,
  findById,
  findExceptId,
  createUser,
  getUsersLike,
  userUploadAvatar,
};
export default userRequest;
