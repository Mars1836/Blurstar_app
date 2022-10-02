import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const log = (store) => (next) => (action) => {
  next(action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, log))
);
