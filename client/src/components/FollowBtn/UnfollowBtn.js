import React from "react";
import Button from "../Button";
import Unfollow from "../Model/components/Unfollow/Unfollow";

import userRequest from "~/httprequest/user";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./FollowBtn.module.scss";
import classNames from "classnames/bind";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
const cx = classNames.bind(styles);
function UnfollowBtn({ text = "Unfollow", action, author, onClick, ...props }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.mainUser?.data?._id);
  const [loading, setLoading] = useState(false);
  function handleUnFollow() {
    const userFollowId = userId;
    const userGetFollowId = author._id;
    dispatch(
      mainUserApiAction.fetchUnfollow({ userFollowId, userGetFollowId })
    );
  }
  return (
    <>
      <Button
        dialog={
          <Unfollow author={author} handleUnFollow={handleUnFollow}></Unfollow>
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
