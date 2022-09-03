import React from "react";
import styles from "./Unfollow.module.scss";
import classNames from "classnames/bind";
import Avatar from "~/components/Avatar";
import { ModelContext } from "../../Model";
import { useContext } from "react";
const cx = classNames.bind(styles);
function Unfollow({ user, handleUnFollow, text = "Unfollow" }) {
  const model = useContext(ModelContext);
  return (
    <div
      className={cx("wapper")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Avatar user={user} size={80} link={0}></Avatar>
      <p className={cx("text")}>Leave @{user?.username}?</p>
      <div className={cx("btn")}>
        <button
          onClick={() => {
            handleUnFollow();
            model.handleClose();
          }}
        >
          {text}
        </button>
        <button
          onClick={() => {
            model.setClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Unfollow;