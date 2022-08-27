import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Post from "./Component/Post/Post.js";
import postRequest from "../../httprequest/post.js";
import { useEffect, useState } from "react";
import socket from "../../SocketIO/socket.js";
import "~/styles/grid.css";
import Sidebar from "~/layouts/Sidebar/Sidebar.js";
const cx = classNames.bind(styles);

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postRequest.getAll().then(({ data }) => {
      setPosts(data);
    });
    socket.on("get-post", (newPost) => {
      setPosts((posts) => [newPost, ...posts]);
    });
  }, []);
  function removePost(id) {
    const index = posts.findIndex((post) => {
      return id === post._id;
    });
    let newPost = [...posts];
    newPost.splice(index, 1);
    setPosts(newPost);
  }
  return (
    <div className={[cx("wrapper", "grid")]}>
      <div className={cx("row center")}>
        <div className={cx("col l-4 m-8 c-12")}>
          <div className={cx("post-site")}>
            {posts.map((post) => {
              return (
                <Post data={post} key={post._id} remove={removePost}></Post>
              );
            })}
            <div className={cx("st")}></div>
          </div>
        </div>
        <div className={cx("col l-3  m-0 c-0")}>
          <Sidebar></Sidebar>
        </div>
      </div>
    </div>
  );
}
export default Home;
