import styles from "./LikeModel.module.scss";
import classNames from "classnames/bind";
import postRequest from "../../../../httprequest/post";
import userRequest from "../../../../httprequest/user";
import { useEffect, useState } from "react";
import AvatarName from "../../../Avatar/Inherit/AvatarName/AvatarName";
const cx = classNames.bind(styles);
const LikeModel = ({ postsId }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userRequest.getUsersLike(postsId).then(({ data }) => {
      setUsers(data);
    });
  }, []);
  const handleClick = (e) => {
    console.log(users);
    e.stopPropagation();
  };
  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("title")}>Likes</div>
      <div className={cx("list")}>
        {users.map((user, index) => {
          console.log(user);
          return (
            <div className={cx("user")} key={index}>
              <AvatarName user={user} size={35}></AvatarName>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LikeModel;
