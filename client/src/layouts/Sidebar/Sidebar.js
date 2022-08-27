import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useUser } from "~/services/RequireAuth";
import AvatarName from "~/components/Avatar/Inherit/AvatarName/AvatarName";
import AvatarBox from "~/components/Avatar/Inherit/AvatarBox";
import Button from "~/components/Button";
import userRequest from "~/httprequest/user";
import { useState } from "react";
const cx = classNames.bind(styles);
function Sidebar() {
  const { user } = useUser();
  const [users, setUsers] = useState();
  useEffect(() => {
    if (user) {
      userRequest.findExceptId(user?._id).then(({ data }) => {
        setUsers(data);
      });
    }
  }, [user]);
  return (
    <div className={cx("wrapper")}>
      <AvatarBox user={user} action={"Switch"} avtLarge></AvatarBox>
      <div className={cx("title-suggest")}>
        <p className={cx("text-1")}>Suggestions For You</p>
        <Button className={cx("text-2")}>Xem tất cả</Button>
      </div>
      <div className={cx("list-user")}>
        {users && (
          <>
            {users.map((user) => {
              return (
                <AvatarBox
                  user={user}
                  key={user._id}
                  action={"Follow"}
                ></AvatarBox>
              );
            })}
          </>
        )}
      </div>
      <ul className={cx("side-footer")}>
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Help</a>
        </li>
        <li>
          <a>Press</a>
        </li>
        <li>
          <a>API</a>
        </li>
        <li>
          <a>Jobs</a>
        </li>
        <li>
          <a>Privace</a>
        </li>
        <li>
          <a>Terms</a>
        </li>
        <li>
          <a>Locations</a>
        </li>
        <li>
          <a>Language</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
