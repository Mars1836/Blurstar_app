import styles from "./Profile.module.scss";
import classnames from "classnames/bind";
import Button from "../../components/Button";
import SetAvatar from "../../components/Model/components/SetAvatar";
import Avatar from "../../components/Avatar";
import { useUser } from "../../services/RequireAuth";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
const cx = classnames.bind(styles);
function Profile() {
  const { user } = useUser();
  const [updateName, setUpdateName] = useState(false);
  return (
    <div className={cx("wapper")}>
      <div className={cx("head")}>
        <div className={cx("background")}></div>
        <div className={cx("avatar")}>
          <Avatar size={80} user={user}></Avatar>
          <span className={cx("update-image-btn")}>
            <Button dialog={<SetAvatar />}>
              <PhotoCameraIcon fontSize="medium"></PhotoCameraIcon>
            </Button>
          </span>
          <p className={cx("name-user")}>{user?.name}</p>
        </div>
      </div>
      <div className={cx("infor")}>
        <ul>
          <li className={cx("infor-field")}>
            <p>Name</p>
            <input type="text" readOnly={!updateName}></input>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Profile;
