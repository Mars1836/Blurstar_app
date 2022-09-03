import configs from "../configs";
import instance from "../configs/axios";
const apiRoute = {
  getPost: `/api/posts`,
  addComment: `/api/posts/addcomment/`,
  likePost: `/api/posts/like/`,
  removePost: `/api/posts/`,
  editPost: `/api/posts/`,
  getListPosts: "/api/posts/findlist",
};
const getAll = async () => {
  const posts = await instance.get(`${apiRoute.getPost}`);
  return posts;
};
const createPost = async (post, dataURL) => {
  const newPost = await instance.post(`${apiRoute.getPost}`, { post, dataURL });
  return newPost;
};
const addComment = async (postid, comment) => {
  const newComment = await instance.patch(`${apiRoute.addComment + postid}`, {
    userId: comment.userid,
    content: comment.content,
  });
  return newComment;
};
const likePost = async (postId, userId) => {
  await instance.patch(`${apiRoute.likePost + postId}`, {
    userId: userId,
  });
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
const postRequest = {
  getAll,
  addComment,
  createPost,
  likePost,
  removePost,
  editPost,
  getListPosts,
};
export default postRequest;
