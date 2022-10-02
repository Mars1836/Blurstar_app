import styles from "./Avatar.module.scss";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Avatar({ size, url, username, link }) {
  let Comp = "div";
  if (link) {
    Comp = Link;
  }
  return (
    <div className={cx("wrapper")}>
      <Comp to={!link ? "" : `/profile/${username}`}>
        <img
          width={size || 40}
          height={size || 40}
          className={cx("avatar")}
          src={url || `${process.env.PUBLIC_URL + "/avtdf.png"}`}
        ></img>
      </Comp>
    </div>
  );
}
export default Avatar;
