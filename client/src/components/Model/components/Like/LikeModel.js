import styles from "./LikeModel.module.scss";
import classNames from "classnames/bind";
import AvatarBox from "~/components/Avatar/Inherit/AvatarBox";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
const LikeModel = ({ title, listUser }) => {
  const [users, setUsers] = useState([]);
  const [listUsersData, setListUsersData] = useState([]);
  useEffect(() => {
    listUser.then(({ data }) => {
      console.log(data);
      setListUsersData(data);
    });
  }, []);
  const handleClick = (e) => {
    console.log(users);
    e.stopPropagation();
  };
  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("title")}>{title ? title : "Likes"}</div>
      <div className={cx("list")}>
        {listUsersData.map((user, index) => {
          console.log(user);
          return (
            <div className={cx("user")} key={index}>
              <AvatarBox user={user}></AvatarBox>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LikeModel;
