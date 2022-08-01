import styles from "./Avatar.module.scss";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Avatar({ size, user, link }) {
  return (
    <div className={cx("wrapper")}>
      <Link to={!link ? "" : `/profile/${user?.username}`}>
        <img
          width={size || 40}
          height={size || 40}
          className={cx("avatar")}
          src={
            user?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/147/147142.png"
          }
        ></img>
      </Link>
    </div>
  );
}
export default Avatar;