import mainUserType from "../actionType/mainUserType";
import produce from "immer";
const initState = {
  data: null,
  loading: false,
  error: null,
};
const mainUserReducer = produce((state = initState, action) => {
  switch (action.type) {
    case mainUserType.loginSuccess:
      state.data = action.payload;
      break;
    case mainUserType.loginError:
      state.error = action.payload;
      break;
    case mainUserType.follow:
      if (state.data) {
        state.data.following.push(action.payload);
      }

      break;
    case mainUserType.unfollow:
      if (state.data) {
        state.data.following = state.data.following.filter((userid) => {
          return userid !== action.payload;
        });
      }
      break;
    case mainUserType.updateAvatar:
      state.data.avatar = action.payload;
      break;
    case mainUserType.getNotification:
      state.data.notifications.unshift(action.payload);
      break;
    case mainUserType.seenNotify:
      const note = action.payload;
      if (Array.isArray(note)) {
        state.data.notifications = state.data.notifications.map((noti) => {
          return note.includes(noti.id) ? { ...noti, seen: true } : noti;
        });
      } else {
        state.data.notifications = state.data.notifications.map((noti) => {
          if (note === noti.id) {
            console.log({ ...noti, seen: true });
          }
          return note === noti.id ? { ...noti, seen: true } : noti;
        });
      }
    case mainUserType.updateInfor:
      const infor = action.payload;
      state.data = { ...state.data, ...infor };
    default:
      return state;
  }
});
export default mainUserReducer;
