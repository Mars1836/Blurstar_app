import mainUserType from "../actionType/mainUserType";
import userRequest from "~/httprequest/user";
export const mainUserAction = {
  login: (payload) => {
    return { type: mainUserType.login, payload };
  },
  loginSuccess: (payload) => {
    return { type: mainUserType.loginSuccess, payload };
  },
  loginRequest: (payload) => {
    return { type: mainUserType.loginRequest, payload };
  },
  loginError: (payload) => {
    return { type: mainUserType.loginError, payload };
  },
  follow: (payload) => {
    return {
      type: mainUserType.follow,
      payload,
    };
  },
  unfollow: (payload) => {
    return {
      type: mainUserType.unfollow,
      payload,
    };
  },
  updateAvatar: (payload) => {
    return {
      type: mainUserType.updateAvatar,
      payload,
    };
  },
  updateInfor: (payload) => {
    return {
      type: mainUserType.updateInfor,
      payload,
    };
  },
  getNotification: (payload) => {
    return {
      type: mainUserType.getNotification,
      payload,
    };
  },
  seenNotify: (payload) => {
    return {
      type: mainUserType.seenNotify,
      payload,
    };
  },
};
export const mainUserApiAction = {
  loginFetchApi: (payload) => {
    return (dispatch) => {
      userRequest
        .findById(payload)
        .then(({ data }) => {
          dispatch(mainUserAction.loginSuccess(data));
        })
        .catch((error) => {
          dispatch(mainUserAction.loginError(error));
        });
    };
  },
  fetchFollow: (payload) => {
    return (dispatch) => {
      userRequest
        .follow(payload)
        .then(({ data }) => {
          dispatch(mainUserAction.follow(data.following));
        })
        .catch();
    };
  },
  fetchUnfollow: (payload) => {
    return (dispatch) => {
      userRequest
        .unfollow(payload)
        .then(({ data }) => {
          dispatch(mainUserAction.unfollow(data.following));
        })
        .catch();
    };
  },
  fetchUpdateAvatar: (base64EncodedImage, userId) => {
    return (dispatch) => {
      userRequest
        .userUploadAvatar(base64EncodedImage, userId)
        .then(({ data }) => {
          console.log(data);
          dispatch(mainUserAction.updateAvatar(data));
        });
    };
  },
  fetchCreateNotification: (userId, notify) => {
    return (dispatch) => {
      userRequest.addNotification(userId, notify).then(({ data }) => {
        dispatch(mainUserAction.getNotification(data));
        console.log(data);
      });
    };
  },
  fetchSeenNotify: (userId, notifyId) => {
    if (!Array.isArray(notifyId)) {
      notifyId = [notifyId];
    }
    return (dispatch) => {
      userRequest.seenNotify(userId, notifyId).then(() => {
        dispatch(mainUserAction.seenNotify(notifyId));
      });
    };
  },
};
