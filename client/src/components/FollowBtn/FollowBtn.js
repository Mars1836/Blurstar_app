import React from "react";
import Button from "../Button";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import styles from "./FollowBtn.module.scss";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
const cx = classNames.bind(styles);
function FollowBtn({ text = "Follow", action, author, ...props }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userFollowing = useSelector((state) => state.mainUser?.data?.following);
  const userId = useSelector((state) => state.mainUser?.data?._id);
  function handleFollow() {
    const userFollowId = userId;
    const userGetFollowId = author?._id;
    dispatch(mainUserApiAction.fetchFollow({ userFollowId, userGetFollowId }));
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
