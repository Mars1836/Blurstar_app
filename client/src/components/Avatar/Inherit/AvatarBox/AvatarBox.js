import React from "react";
import styles from "./AvataBox.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
function AvatarBox({ username, url, name, avtLarge, btn }) {
  return (
    <div className={cx("item")}>
      <Avatar
        url={url}
        username={username}
        size={avtLarge ? 56 : 32}
        link={true}
      ></Avatar>
      <span className={cx("item-text")}>
        <Link to={`/profile/${username}`} className={cx("username")}>
          {username}
        </Link>
        <p className={cx("name")}>{name}</p>
      </span>
      <span className={cx("btn-side")}>{btn}</span>
    </div>
  );
}

export default AvatarBox;
