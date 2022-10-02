import styles from "./LikeModel.module.scss";
import classNames from "classnames/bind";
import AvatarBox from "~/components/Avatar/Inherit/AvatarBox";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
const LikeModel = ({ title, listUsers }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("title")}>{title ? title : "Likes"}</div>
      <div className={cx("list")}>
        {listUsers.map((user, index) => {
          return (
            <div className={cx("user")} key={index}>
              <AvatarBox
                username={user?.username}
                url={user?.avatar}
                name={user?.name}
              ></AvatarBox>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LikeModel;
