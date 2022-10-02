import produce from "immer";
import postType from "../actionType/postType";
const initState = {
  byId: {},
  suggested: [],
  loading: false,
  error: null,
};
const postReducer = produce((state = initState, action) => {
  switch (action.type) {
    case postType.getSuggestedPost:
      state.suggested = action.payload;
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
      if (action.payload.order === -1) {
        state.suggested.push(action.payload._id);
      } else {
        state.suggested.unshift(action.payload._id);
      }
      break;
    case postType.commentPost:
      if (state.byId[action.payload.postId]) {
        state.byId[action.payload.postId].comments.unshift(action.payload._id);
        state.byId[action.payload.postId].commentData.allIds.unshift(
          action.payload._id
        );
        state.byId[action.payload.postId].commentData.byId[action.payload._id] =
          action.payload;
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
    default:
      break;
  }
  return state;
});
export default postReducer;
