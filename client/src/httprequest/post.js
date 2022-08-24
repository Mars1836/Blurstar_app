import configs from "../configs";
import instance from "../configs/axios";
const apiRoute = {
  getPost: `/api/posts`,
  addComment: `/api/posts/addcomment/`,
  likePost: `/api/posts/like/`,
  removePost: `/api/posts/`,
  editPost: `/api/posts/`,
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
  console.log(newComment.data);
  return newComment;
};
const likePost = async (postId, userId) => {
  await instance.patch(`${apiRoute.likePost + postId}`, {
    userId: userId,
  });
};
const removePost = async () => {};
const editPost = async () => {};
const postRequest = {
  getAll,
  addComment,
  createPost,
  likePost,
  removePost,
  editPost,
};
export default postRequest;
