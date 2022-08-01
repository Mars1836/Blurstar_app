import { useUser } from "../../services/RequireAuth.js";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Post from "./Component/Post/Post.js";
import postRequest from "../../httprequest/post.js";
import userRequest from "../../httprequest/user.js";
import Model from "../../components/Model";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    postRequest.getAll().then(({ data }) => {
      setPosts(data);
      console.log(data);
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("post-site")}>
        {posts.map((post, index) => {
          return <Post data={post} key={index}></Post>;
        })}
      </div>
      <div className={cx("st")}></div>
    </div>
  );
}
export default Home;
