import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Post from "./Component/Post/Post.js";
import { useEffect, useState } from "react";
import "~/styles/grid.css";
import Sidebar from "~/layouts/Sidebar/Sidebar.js";
import { postApiAction } from "~/store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);

function Home() {
  const userId = useSelector((state) => {
    return state.mainUser._id;
  });
  const dispatch = useDispatch();
  const suggestedPosts = useSelector((state) => {
    return state.posts.suggested;
  });
  useEffect(() => {
    dispatch(postApiAction.fetchGetSuggestedPost(userId));
  }, []);

  return (
    <div className={[cx("wrapper", "grid")]}>
      <div className={cx("row center")}>
        <div className={cx("col l-4 m-8 c-12")}>
          <div className={cx("post-site")}>
            {suggestedPosts.map((id) => {
              return <Post postid={id} key={id}></Post>;
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
