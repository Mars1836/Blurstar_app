import produce from "immer";
import postType from "../actionType/postType";
const initState = {
  byId: {},
  suggested: [],
  loading: false,
  loadingSuggestedPost: false,
  error: null,
};
const postReducer = produce((state = initState, action) => {
  switch (action.type) {
    case postType.getSuggestedPost:
      const list = action.payload.map((id) => {
        return {
          id,
          show: true,
        };
      });
      state.suggested = [...state.suggested, ...list];
      state.loadingSuggestedPost = false;
      break;
    case postType.getPostSuggestRequest:
      state.loadingSuggestedPost = true;
      break;
    case postType.getPostRequest:
      state.loading = true;
      state.error = null;
      break;
    case postType.getPostSuccess:
      const byId = action.payload.reduce((ob, item) => {
        return {
          ...ob,
          [item._id]: item,
        };
      }, state.byId);
      state.byId = byId;
    case postType.getPostError:
      state.error = action.payload;
      state.loading = false;
      break;
    case postType.removePost:
      delete state.byId[action.payload];
      break;
    case postType.loadCommentPost:
      if (!state.byId[action.payload.postId].commentData) {
        state.byId[action.payload.postId].commentData = {
          byId: {},
        };
      }
      action.payload.commentsloaded.forEach((comment) => {
        state.byId[action.payload.postId].commentData.byId[comment._id] =
          comment;
      });
      state.byId[action.payload.postId].commentData.allIds = Object.keys(
        state.byId[action.payload.postId].commentData.byId
      );
      break;
    case postType.createPost:
      state.byId[action.payload._id] = action.payload;
      state.suggested.unshift({ id: action.payload._id, show: true });
      break;
    case postType.commentPost:
      if (state.byId[action.payload.postId]) {
        state.byId[action.payload.postId].comments.unshift(action.payload._id);
        if (!state.byId[action.payload.postId].commentData) {
          state.byId[action.payload.postId].commentData = {
            byId: {},
            allIds: [],
          };
        }
        state.byId[action.payload.postId].commentData.allIds.unshift(
          action.payload._id
        );
        state.byId[action.payload.postId].commentData.byId[action.payload._id] =
          action.payload;
      }

      break;
    case postType.removeCommentPost:
      {
        const { postId, commentId } = action.payload;
        state.byId[postId].comments = state.byId[postId].comments.filter(
          (id) => {
            return id !== commentId;
          }
        );
        state.byId[postId].commentData.allIds = state.byId[
          postId
        ].commentData.allIds.filter((id) => {
          return id !== commentId;
        });
        delete state.byId[postId].commentData.byId[commentId];
      }
      break;
    case postType.removeReplyComment:
      {
        const { postId, commentId } = action.payload;
        console.log("asddddddddasjdjjjas");
        console.log({ postId, commentId });
      }
      break;
    case postType.unlikePost:
      {
        const { postId, userId } = action.payload;
        if (state.byId[postId]) {
          state.byId[postId].likes = state.byId[postId].likes.filter((id) => {
            return id !== userId;
          });
        }
      }
      break;
    case postType.likePost:
      {
        const { postId, userId } = action.payload;
        if (state.byId[postId]) {
          state.byId[postId].likes.push(userId);
        }
      }
      break;
    case postType.deleteSuggestedPost:
      const index = state.suggested.findIndex((ob) => {
        return ob.id === action.payload;
      });
      state.suggested[index] = {
        id: state.suggested[index].id,
        show: false,
      };
    default:
      break;
  }
  return state;
});
export default postReducer;
