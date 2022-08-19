import { useUser } from "../../services/RequireAuth.js";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Post from "./Component/Post/Post.js";
import postRequest from "../../httprequest/post.js";
import userRequest from "../../httprequest/user.js";
import Model from "../../components/Model";
import { useEffect, useState } from "react";
import socket from "../../SocketIO/socket.js";
import "~/styles/grid.css";
const cx = classNames.bind(styles);

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    postRequest.getAll().then(({ data }) => {
      setPosts(data);
    });
    socket.on("get-post", (newPost) => {
      setPosts((posts) => [newPost, ...posts]);
    });
  }, []);
  return (
    <div className={[cx("wrapper", "grid")]}>
      <div className={cx("row")}>
        <div className={cx("col l-6 l-0-3 m-8 m-0-2 c-12")}>
          <div className={cx("post-site")}>
            {posts.map((post) => {
              return <Post data={post} key={post._id}></Post>;
            })}
            <div className={cx("st")}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
