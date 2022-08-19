import React from "react";
import classNames from "classnames/bind";
import styles from "./Head.module.scss";
import Avatar from "~/components/Avatar";
import { useUser } from "~/services/RequireAuth";
import "~/styles/grid.css";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
const border = {
  border: "1px solid #DBDBDB",
  padding: "3px 6px",
  borderRadius: "5px",
  minWidth: "86px",
  display: "flex",
  justifyContent: "center",
  minHeight: "30px",
};
const Head = ({ user, isAuthor }) => {
  console.log(isAuthor);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar-container")}>
        <div className={cx("avatar")}>
          <Avatar user={user} size={150} link={0}></Avatar>
        </div>
        <div className={cx("side-avatar")}>
          <div className={cx("side-avatar-wapper")}>
            <h1 className={cx("username")}>{user?.username}</h1>
            {isAuthor ? (
              <>
                {" "}
                <Button style={border}>Edit profile</Button>
                <Button>
                  <svg
                    aria-label="Options"
                    className="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </Button>{" "}
              </>
            ) : (
              <>
                <Button style={border}>Message</Button>
                <Button style={border}>
                  <svg
                    aria-label="Following"
                    className="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="15"
                    role="img"
                    viewBox="0 0 95.28 70.03"
                    width="20"
                  >
                    <path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path>
                  </svg>
                </Button>
              </>
            )}
          </div>
          <div className={cx("parameter")}>
            <Button>1 posts</Button>
            <Button>3 followers</Button>
            <Button>16 following</Button>
          </div>
          <h2 className={cx("name")}>{user?.name}</h2>
        </div>
      </div>
      <div className={cx("tab")}>
        <div className={cx("posts")}></div>
        <div className={cx("about")}></div>
      </div>
    </div>
  );
};
export default Head;
