import configs from "../configs";
import instance from "../configs/axios";
import notifications from "~/configs/notification";
import socket from "~/SocketIO/socket";
const apiRoute = {
  getCommentById: `/api/comments/`,
  getAllComment: `/api/comments`,
  getListComment: `/api/comments/findlist`,
  addComment: `/api/comments/addcomment/`,
  removeComment: `/api/comments/`,
  removeReply: `/api/comments/reply/`,
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
  addComment: async (commentId, newComment, to, postId) => {
    const comment = await instance.post(`${apiRoute.addComment + commentId}`, {
      userid: newComment.userid,
      content: newComment.content,
    });
    socket.emit("reply", comment.data, commentId);
    socket.emit("notification", to, {
      type: notifications.replyComment,
      postId: postId,
      userId: newComment.userid,
    });
    return comment;
  },
  removeComment: async (commentId, postId, commentParentId) => {
    const comment = await instance.delete(
      `${apiRoute.removeComment + commentId}`,
      {
        data: {
          postId,
          commentId,
          commentParentId,
        },
      }
    );
    socket.emit("remove-comment", commentId);
    return comment;
  },
};
export default commentRequest;
