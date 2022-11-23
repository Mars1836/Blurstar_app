import styles from "./Profile.module.scss";
import classnames from "classnames/bind";
import Head from "./components/Head/Head";
import { useState, useEffect } from "react";
import Button from "~/components/Button";
import { useLocation } from "react-router-dom";
import userRequest from "~/httprequest/user";
import Post from "../Home/Component/Post";
import LoadingComment from "~/components/Loading/LoadingComment";
import Sidebar from "~/layouts/SidebarRight/Sidebar";
import useBreakpoint from "~/hooks/useBreakpoint";
import { useDispatch, useSelector } from "react-redux";
const cx = classnames.bind(styles);
function Profile() {
  const { isMobile } = useBreakpoint();
  const location = useLocation();
  const user_path = location.pathname.split("/")[2];
  const isAuthor = useSelector(
    (state) => state.mainUser?.data?.username === user_path
  );
  const dispatch = useDispatch();
  const [author, setAuthor] = useState();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    userRequest
      .getUserByUsername(user_path)
      .then(({ data }) => {
        setAuthor(data);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  return (
    <>
      {isAuthor !== null ? (
        <div className={cx("wrapper")}>
          {author && <Head author={author} isAuthor={isAuthor}></Head>}
          <div className={cx("body")}>
            <div className={cx("post-contain")}>
              <div className={cx("tab")}>
                <div className={cx("line")}></div>
                <div className={cx("content", { mobile: isMobile })}>
                  <span
                    className={cx("tab-btn")}
                    style={
                      tab === 0
                        ? { opacity: 1, borderTop: "1px solid black" }
                        : { opacity: 0.5 }
                    }
                  >
                    <button
                      className={cx("btn_tab")}
                      onClick={() => {
                        setTab(0);
                      }}
                    >
                      <div>
                        <svg
                          aria-label=""
                          className="_ab6-"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                        >
                          <rect
                            fill="none"
                            height="18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            width="18"
                            x="3"
                            y="3"
                          ></rect>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="9.015"
                            x2="9.015"
                            y1="3"
                            y2="21"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="14.985"
                            x2="14.985"
                            y1="3"
                            y2="21"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="21"
                            x2="3"
                            y1="9.015"
                            y2="9.015"
                          ></line>
                          <line
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="21"
                            x2="3"
                            y1="14.985"
                            y2="14.985"
                          ></line>
                        </svg>
                      </div>
                      <p>Posts</p>
                    </button>
                  </span>
                  {!isAuthor || (
                    <span
                      className={cx("tab-btn")}
                      style={
                        tab === 1
                          ? { opacity: 1, borderTop: "1px solid black" }
                          : { opacity: 0.5 }
                      }
                    >
                      <button
                        className={cx("btn_tab")}
                        onClick={() => {
                          setTab(1);
                        }}
                      >
                        <div className="">
                          <svg
                            aria-label=""
                            className="_ab6-"
                            color="#262626"
                            fill="#262626"
                            height="12"
                            role="img"
                            viewBox="0 0 24 24"
                            width="12"
                          >
                            <polygon
                              fill="none"
                              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></polygon>
                          </svg>
                        </div>
                        <p> Saved</p>
                      </button>
                    </span>
                  )}
                  <span
                    className={cx("tab-btn")}
                    style={
                      tab === 2
                        ? { opacity: 1, borderTop: "1px solid black" }
                        : { opacity: 0.5 }
                    }
                  >
                    <button
                      className={cx("btn_tab")}
                      onClick={() => {
                        setTab(2);
                      }}
                    >
                      <div>
                        <svg
                          aria-label=""
                          className="_ab6-"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                        >
                          <path
                            d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                          <path
                            d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                          <circle
                            cx="12.072"
                            cy="11.075"
                            fill="none"
                            r="3.556"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                        </svg>
                      </div>
                      <p>Tagged</p>
                    </button>
                  </span>
                </div>
              </div>
              {tab === 0 && (
                <div className={cx("post-site")}>
                  {posts.length > 0 && (
                    <>
                      {posts.map((postId) => {
                        return <Post postid={postId} key={postId}></Post>;
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={cx("sidebar")}></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Profile;
