import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { publicRoute, privateRoute } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import RequireAuth from "./services/RequireAuth";
import RequireNotAuth from "./services/RequireNotAuth";
import { AuthPrivide } from "./services/auth";
import { useDispatch, useSelector } from "react-redux";
import socket from "./SocketIO/socket";
import { postAction } from "./store/actions/postAction";
import {
  mainUserAction,
  mainUserApiAction,
} from "./store/actions/mainUserAction";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.mainUser?.data?._id);

  useEffect(() => {
    socket.on("get-comment", (comment, postId) => {
      dispatch(postAction.commentPost({ ...comment, postId }));
    });

    socket.on("get-like-post", (userId, postId) => {
      dispatch(postAction.likePost({ userId, postId }));
    });
    socket.on("get-unlike-post", (userId, postId) => {
      dispatch(postAction.unlikePost({ userId, postId }));
    });
    socket.on("get-post", (post) => {
      dispatch(postAction.createPost({ ...post, order: -1 }));
    });

    socket.on("get-notification", (data) => {
      if (data.userId !== userId)
        dispatch(mainUserApiAction.fetchCreateNotification(userId, data));
    });
    return () => {
      socket.off("get-comment");
      socket.off("get-like-post");
      socket.off("get-unlike-post");
      socket.off("get-post");
      socket.off("get-notification");
    };
  }, [userId]);

  return (
    <AuthPrivide>
      <BrowserRouter>
        <div className="App"></div>
        <Routes>
          {publicRoute.map((page, index) => {
            let Layout = DefaultLayout;
            let Content = page.component;
            if (page.layout === null) {
              Layout = "div";
            }
            return (
              <Route
                key={index}
                path={page.path}
                element={
                  <RequireNotAuth>
                    <Layout>
                      <Content></Content>
                    </Layout>
                  </RequireNotAuth>
                }
              ></Route>
            );
          })}
          {privateRoute.map((page, index) => {
            let Layout = DefaultLayout;

            let Content = page.component;
            if (page.layout) {
              Layout = page.layout;
            }
            if (page.layout === null) {
              Layout = "div";
            }
            return (
              <Route
                key={index}
                path={page.path}
                element={
                  <RequireAuth>
                    <Layout>
                      <Content></Content>
                    </Layout>
                  </RequireAuth>
                }
              ></Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </AuthPrivide>
  );
}

export default App;
