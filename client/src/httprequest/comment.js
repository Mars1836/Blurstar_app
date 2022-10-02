import configs from "../configs";
import instance from "../configs/axios";
import axios from "axios";
import socket from "~/SocketIO/socket";
const apiRoute = {
  getCommentById: `/api/comments/`,
  getAllComment: `/api/comments`,
  getListComment: `/api/comments/findlist`,
  addComment: `/api/comments/addcomment/`,
  removeComment: `/api/comments/`,
};
const notifications = { configs };
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
    socket.emit("reply", comment.data, commentId);
    socket.emit("notification", notifications.commentPost, {
      target: commentId,
      from: newComment.userid,
    });
    return comment;
  },
  removeComment: async (commentId) => {
    const comment = await instance.delete(
      `${apiRoute.removeComment + commentId}`
    );
    socket.emit("remove-comment", commentId);
    return comment;
  },
};
export default commentRequest;
