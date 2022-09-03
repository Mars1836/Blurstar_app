import configs from "../configs";
import instance from "../configs/axios";
import axios from "axios";
const apiRoute = {
  getCommentById: `/api/comments/`,
  getAllComment: `/api/comments`,
  getListComment: `/api/comments/findlist`,
  addComment: `/api/comments/addcomment/`,
  removeComment: `/api/comments/`,
};

const commentRequest = {
  getCommentById: () => {},
  getAllComment: () => {},
  getListComment: async (listId, sort = -1, pageCount = 0, limit = 3) => {
    const comments = await instance.post(`${apiRoute.getListComment}`, {
      listId,
      sort,
      pageCount,
      limit,
    });
    return comments;
  },
  addComment: async (commentId, newComment) => {
    const comment = await instance.post(`${apiRoute.addComment + commentId}`, {
      userid: newComment.userid,
      content: newComment.content,
    });
    return comment;
  },
  removeComment: async (commentId) => {
    const comment = await instance.delete(
      `${apiRoute.removeComment + commentId}`
    );
    return comment;
  },
};
export default commentRequest;
