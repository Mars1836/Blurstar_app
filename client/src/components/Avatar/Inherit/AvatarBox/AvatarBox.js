import React from "react";
import styles from "./AvataBox.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
function AvatarBox({ user, avtLarge, action }) {
  return (
    <div className={cx("item")}>
      <Avatar user={user} size={avtLarge ? 56 : 32} link={true}></Avatar>
      <span className={cx("item-text")}>
        <Link to={`/profile/${user?.username}`} className={cx("username")}>
          {" "}
          {user?.username}
        </Link>
        <p className={cx("name")}>{user?.name}</p>
      </span>
      <Button className={cx("btn-side")} text>
        {action}
      </Button>
    </div>
  );
}

export default AvatarBox;
