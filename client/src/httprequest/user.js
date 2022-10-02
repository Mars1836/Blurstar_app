import configs from "../configs";
import instance from "../configs/axios";
import axios from "axios";
import socket from "~/SocketIO/socket";
export const apiRoute = {
  findAll: `/api/users`,
  findById: `/api/users/find/`,
  findExceptId: `/api/users/except/`,
  findUserByUserName: `/api/users/find_by_username/`,
  createUser: `/auth/register`,
  getUsersLike: `/api/users/userslike/`,
  userUploadAvatar: `/api/users/uploadavatar/`,
  follow: `/api/users/follow`,
  unfollow: `/api/users/unfollow`,
  getUsersByListsId: `/api/users/findlist`,
  addNotification: `/api/users/notification/`,
  seenNotify: `/api/users/notification/seen`,
};
const findAll = async () => {
  const user = await instance.get(`${apiRoute.findAll}`);
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
const getUserByUsername = async (username) => {
  const user = await instance.get(`${apiRoute.findUserByUserName + username}`);
  return user;
};
const userUploadAvatar = async (base64EncodedImage, userId) => {
  const url = await instance.post(`${apiRoute.userUploadAvatar + userId}`, {
    image: base64EncodedImage,
  });
  return url;
};
const follow = async ({ userFollowId, userGetFollowId }) => {
  const res = await instance.post(`${apiRoute.follow}`, {
    userFollowId: userFollowId,
    userGetFollowId: userGetFollowId,
  });

  socket.emit("follow-user", userGetFollowId, userFollowId);

  return res;
};
const unfollow = async ({ userFollowId, userGetFollowId }) => {
  const res = await instance.post(`${apiRoute.unfollow}`, {
    userFollowId: userFollowId,
    userGetFollowId: userGetFollowId,
  });
  socket.emit("unfollow-user", userGetFollowId, userFollowId);
  return res;
};
const getUsersByListsId = async (list) => {
  const users = await instance.post(`${apiRoute.getUsersByListsId}`, {
    list,
  });
  return users;
};
const addNotification = async (userId, noti) => {
  const user = await instance.post(
    `${apiRoute.addNotification + userId}`,
    noti
  );
  return user;
};
const seenNotify = async (userId, notifications) => {
  const u = await instance.post(`${apiRoute.seenNotify}`, {
    userId,
    notifications,
  });
  return u;
};
const userRequest = {
  findAll,
  findById,
  findExceptId,
  createUser,
  getUsersLike,
  userUploadAvatar,
  getUserByUsername,
  follow,
  unfollow,
  getUsersByListsId,
  addNotification,
  seenNotify,
};
export default userRequest;
