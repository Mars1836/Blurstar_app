import React from "react";
import Button from "../Button";
import Unfollow from "../Model/components/Unfollow/Unfollow";

import userRequest from "~/httprequest/user";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./FollowBtn.module.scss";
import classNames from "classnames/bind";
import socket from "~/SocketIO/socket";
import { useUser } from "~/services/RequireAuth";
const cx = classNames.bind(styles);
function UnfollowBtn({
  text = "Unfollow",
  action,
  user,
  mainUser,
  onClick,
  ...props
}) {
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);
  function handleUnFollow() {
    const userFollowId = mainUser._id;
    const userGetFollowId = user._id;
    setLoading(true);
    userRequest
      .unfollow(userFollowId, userGetFollowId)
      .then((data) => {
        setTimeout(() => {
          if (action) {
            action();
          }
          setUser({
            ...mainUser,
            following: mainUser.following.filter((x) => {
              return x !== user._id;
            }),
          });
          socket.emit("unfollow-user", user, mainUser);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Button
        dialog={
          <Unfollow user={user} handleUnFollow={handleUnFollow}></Unfollow>
        }
        onClick={onClick}
        style={{
          color: "#000",
        }}
        disabled={loading}
        {...props}
      >
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

export default UnfollowBtn;
