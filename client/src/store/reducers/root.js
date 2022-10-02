import { combineReducers } from "redux";
import postReducer from "./post";
import mainUserReducer from "./mainUser";
const rootReducer = combineReducers({
  mainUser: mainUserReducer,
  posts: postReducer,
});
export default rootReducer;
