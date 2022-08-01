import styles from "./AvatarName.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function AvatarName({ size, user }) {
  return (
    <div className={cx("wrapper")}>
      <Avatar size={size || 30} user={user} link></Avatar>

      <Link
        to={`/profile/${user?.username}`}
        className={cx("user-name")}
        style={{ fontSize: `${size / 2}px` }}
      >
        {user?.name}
      </Link>
    </div>
  );
}
export default AvatarName;
