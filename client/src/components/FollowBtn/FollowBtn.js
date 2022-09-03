import React from "react";
import Button from "../Button";
import userRequest from "~/httprequest/user";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import styles from "./FollowBtn.module.scss";
import classNames from "classnames/bind";
import socket from "~/SocketIO/socket";
import { useUser } from "~/services/RequireAuth";
const cx = classNames.bind(styles);
function FollowBtn({ text = "Follow", action, user, mainUser, ...props }) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  function handleFollow() {
    const userFollowId = mainUser._id;
    const userGetFollowId = user._id;
    setLoading(true);
    userRequest.follow(userFollowId, userGetFollowId).then((data) => {
      setTimeout(() => {
        if (action) {
          action();
        }
        socket.emit("follow-user", user, mainUser);
        setUser({ ...mainUser, following: [user._id, ...mainUser.following] });
        setLoading(false);
      }, 1000);
    });
  }
  return (
    <>
      <Button onClick={handleFollow} disabled={loading} {...props}>
        <div className={cx("btn-wrapper")}>
          {loading && (
            <div className={cx("icon-load")}>
              <CircularProgress size={20} className={cx("load")} />
            </div>
          )}
          <div className={cx("text")} style={loading ? { opacity: 0 } : {}}>
            {text}
          </div>
        </div>
      </Button>
    </>
  );
}

export default FollowBtn;
