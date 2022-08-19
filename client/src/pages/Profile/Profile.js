import styles from "./Profile.module.scss";
import classnames from "classnames/bind";
import Head from "./components/Head/Head";
import { useUser } from "../../services/RequireAuth";
import { useState, useEffect } from "react";
import Button from "~/components/Button";
import { borderTop } from "@mui/system";
import { useLocation } from "react-router-dom";
import userRequest from "~/httprequest/user";
const cx = classnames.bind(styles);
function Profile() {
  const { user } = useUser();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [isAuthor, setIsAuthor] = useState("");
  const location = useLocation();
  const user_path = location.pathname.split("/")[2];
  useEffect(() => {
    userRequest
      .getUserByUsername(user_path)
      .then(({ data }) => {
        setAuthor(data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (user) {
      setLoading(false);
    } else {
      return;
    }
    setIsAuthor(user_path === user?.username);
  }, [user, location]);
  return (
    <>
      {loading || (
        <div className={cx("wapper")}>
          <div className={cx("row")}>
            <div className={cx("col l-8 l-0-2")}>
              <Head user={author} isAuthor={isAuthor}></Head>
              <div className={cx("tab")}>
                <div className={cx("line")}></div>
                <div className={cx("content")}>
                  <span
                    className={cx("tab-btn")}
                    style={
                      tab === 0
                        ? { opacity: 1, borderTop: "1px solid black" }
                        : { opacity: 0.5 }
                    }
                  >
                    <Button
                      onClick={() => {
                        setTab(0);
                      }}
                    >
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
                      <p>Posts</p>
                    </Button>
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
                      <Button
                        onClick={() => {
                          setTab(1);
                        }}
                      >
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
                        <p> Saved</p>
                      </Button>
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
                    <Button
                      onClick={() => {
                        setTab(2);
                      }}
                    >
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
                      <p>Tagged</p>
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;

// {
//    <div className={cx("head")}>
//         <div className={cx("background")}></div>
//         <div className={cx("avatar")}>
//           <Avatar size={80} user={user}></Avatar>
//           <span className={cx("update-image-btn")}>
//             <Button dialog={<SetAvatar />}>
//               <PhotoCameraIcon fontSize="medium"></PhotoCameraIcon>
//             </Button>
//           </span>
//           <p className={cx("name-user")}>{user?.name}</p>
//         </div>
//       </div>
//       <div className={cx("infor")}>
//         <ul>
//           <li className={cx("infor-field")}>
//             <p>Name</p>
//             <input type="text" readOnly={!updateName}></input>
//           </li>
//         </ul>
//       </div>
// }
