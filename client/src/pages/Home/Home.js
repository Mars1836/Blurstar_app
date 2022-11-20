import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Post from "./Component/Post/Post.js";
import { useEffect, useRef, useState } from "react";
import "~/styles/grid.css";
import SidebarRight from "~/layouts/SidebarRight/Sidebar.js";
import { postApiAction, postAction } from "~/store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import postRequest from "~/httprequest/post";
const cx = classNames.bind(styles);
function Home() {
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const postSite = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.mainUser._id;
  });
  const suggestedPosts = useSelector((state) => {
    return state.posts.suggested;
  });

  const suggestedPostsLoading = useSelector((state) => {
    return state.posts.loadingSuggestedPost;
  });
  useEffect(() => {
    if (!isFetching) {
      return;
    }
    dispatch(
      postApiAction.fetchGetSuggestedPost(
        userId,
        suggestedPosts.length,
        (bool) => {
          setIsFetching(bool);
        }
      )
    );
  }, [isFetching]);
  useEffect(() => {
    setIsFetching(true);
  }, []);
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight +
          document.documentElement.scrollTop -
          document.documentElement.offsetHeight <
          -70 ||
        isFetching
      ) {
        return;
      }
      setIsFetching(true);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, document.documentElement.offsetHeight]);

  return (
    <div className={[cx("wrapper")]}>
      <div className={cx("post-site")} ref={postSite}>
        {suggestedPosts.map((ob) => {
          if (ob.show === true) {
            return <Post postid={ob.id} key={ob.id}></Post>;
          }
        })}
        <div className={cx("st")}></div>
      </div>
      <div className={cx("sidebar-right")}>
        <SidebarRight></SidebarRight>
      </div>
    </div>
  );
}
export default Home;
