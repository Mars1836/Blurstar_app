import postType from "../actionType/postType";
import postRequest from "~/httprequest/post";
import commentRequest from "~/httprequest/comment";
export const postAction = {
  getPostSuccess: (payload) => {
    return { type: postType.getPostSuccess, payload };
  },
  getPostRequest: (payload) => {
    return { type: postType.getPostRequest, payload };
  },
  getPostError: (payload) => {
    return { type: postType.getPostError, payload };
  },
  removePost: (payload) => {
    return { type: postType.removePost, payload };
  },
  commentPost: (payload) => {
    return { type: postType.commentPost, payload };
  },
  removeCommentPost: (payload) => {
    return { type: postType.removeCommentPost, payload };
  },
  likePost: (payload) => {
    return { type: postType.likePost, payload };
  },
  unlikePost: (payload) => {
    return { type: postType.unlikePost, payload };
  },
  loadCommentPost: (payload) => {
    return { type: postType.loadCommentPost, payload };
  },
  createPost: (payload) => {
    return { type: postType.createPost, payload };
  },
  getSuggestedPost: (payload) => {
    return { type: postType.getSuggestedPost, payload };
  },
};
export const postApiAction = {
  postFetchApi: (payload) => {
    if (payload?.length > 0) {
      return (dispatch) => {
        postRequest
          .getListPosts(payload)
          .then(({ data }) => {
            dispatch(postAction.getPostSuccess(data));
          })
          .catch((error) => {
            dispatch(postAction.getPostError(error));
          });
      };
    } else {
      return (dispatch) => {
        postRequest
          .getAll()
          .then(({ data }) => {
            dispatch(postAction.getPostSuccess(data));
          })
          .catch((error) => {
            console.log(new Error(error));
            dispatch(postAction.getPostError(error));
          });
      };
    }
  },
  fetchRemovePost: (postId) => {
    return (dispatch) => {
      postRequest.removePost(postId).then(({ data }) => {
        dispatch(postAction.removePost(postId));
      });
    };
  },
  fetchCommentPost: (comment, postId, to) => {
    return (dispatch) => {
      postRequest.addComment(comment, postId, to).then(({ data }) => {
        dispatch(postAction.commentPost({ ...data, postId }));
      });
    };
  },
  fetchLoadCommentPost: (payload) => {
    return (dispatch) => {
      commentRequest.getListComment(payload).then(({ data }) => {});
    };
  },
  fetchUnlikePost: (postId, userId) => {
    return (dispatch) => {
      postRequest.unlikePost(postId, userId).then(({ data }) => {
        dispatch(postAction.unlikePost({ postId, userId }));
      });
    };
  },
  fetchLikePost: (postId, userId, to) => {
    return (dispatch) => {
      postRequest.likePost(postId, userId, to).then(({ data }) => {
        dispatch(postAction.likePost({ postId, userId }));
      });
    };
  },
  fetchCreatePost: (post, dataURL, to) => {
    return (dispatch) => {
      postRequest
        .createPost(post, dataURL, to)
        .then(({ data }) => {
          dispatch(postAction.createPost(data));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  },
  fetchGetSuggestedPost: (userId) => {
    return (dispatch) => {
      postRequest.getRecommendPostId(userId).then(({ data }) => {
        dispatch(postAction.getSuggestedPost(data));
      });
    };
  },
};
