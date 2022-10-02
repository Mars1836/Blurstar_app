import configs from "../configs";
import socket from "~/SocketIO/socket";
import instance from "../configs/axios";

const { notifications } = configs;
const apiRoute = {
  getPost: `/api/posts`,
  findById: `/api/posts/find/`,
  addComment: `/api/posts/addcomment/`,
  likePost: `/api/posts/like/`,
  unlikePost: `/api/posts/unlike/`,
  removePost: `/api/posts/`,
  editPost: `/api/posts/`,
  getListPosts: "/api/posts/findlist",
  getRecommendPostId: "/api/posts/recommend",
};
const getAll = async () => {
  const posts = await instance.get(`${apiRoute.getPost}`);
  return posts;
};
const findById = async (postid) => {
  const post = await instance.get(`${apiRoute.findById + postid}`);
  return post;
};
const createPost = async (post, dataURL, to) => {
  const newPost = await instance.post(`${apiRoute.getPost}`, { post, dataURL });
  socket.emit("up-post", newPost.data);

  socket.emit("notification", to, {
    postId: newPost.data._id,
    userId: newPost.data.author,
    type: notifications.upPost,
  });
  return newPost;
};
const addComment = async (comment, postId, to) => {
  const newComment = await instance.patch(`${apiRoute.addComment + postId}`, {
    userId: comment.userid,
    content: comment.content,
  });
  socket.emit("comment", newComment.data, postId, to);
  socket.emit("notification", to, {
    type: notifications.commentPost,
    postId,
    userId: comment.userid,
  });
  return newComment;
};
const likePost = async (postId, userId, to) => {
  const like = await instance.patch(`${apiRoute.likePost + postId}`, {
    userId: userId,
  });
  socket.emit("like-post", userId, postId);
  socket.emit("notification", to, {
    type: notifications.likePost,
    postId,
    userId,
  });
  return like;
};
const unlikePost = async (postId, userId) => {
  const unlike = await instance.patch(`${apiRoute.unlikePost + postId}`, {
    userId: userId,
  });
  socket.emit("unlike-post", userId, postId);

  return unlike;
};
const removePost = async (id) => {
  const p = await instance.delete(`${apiRoute.removePost + id}`);
  return p;
};
const editPost = async () => {};
const getListPosts = async (list) => {
  const posts = await instance.post(`${apiRoute.getListPosts}`, {
    listId: list,
  });
  return posts;
};
const getRecommendPostId = async (userId) => {
  const postIds = await instance.get(`${apiRoute.getRecommendPostId}`);
  return postIds;
};
const postRequest = {
  getAll,
  addComment,
  findById,
  createPost,
  likePost,
  unlikePost,
  removePost,
  editPost,
  getListPosts,
  getRecommendPostId,
};
export default postRequest;
