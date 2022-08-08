import styles from "./AvatarName.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function AvatarName({ size, user, status }) {
  return (
    <div className={cx("wrapper")}>
      <Avatar size={size || 30} user={user} link></Avatar>
      <div className={cx("contain")}>
        <Link
          to={`/profile/${user?.username}`}
          className={cx("user-name")}
          style={{ fontSize: `${size / 2.2}px` }}
        >
          {user?.name}
        </Link>
        <span className={cx("status")}>{status}</span>
      </div>
    </div>
  );
}
export default AvatarName;
