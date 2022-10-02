import styles from "./AvatarName.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function AvatarName({
  size,
  url,
  username,
  name,
  status,
  nameStyle,
  underline = "true",
}) {
  return (
    <div className={cx("wrapper")}>
      <Avatar size={size || 30} username={username} url={url} link></Avatar>
      <div className={cx("contain")}>
        <Link
          to={`/profile/${username}`}
          className={cx("user-name")}
          style={{
            fontSize: `${size / 2.2}px`,
            transform: "transition(10,10)",
            ...nameStyle,
          }}
          underline={underline}
        >
          {username}
        </Link>
        <span className={cx("status")}>{status}</span>
      </div>
    </div>
  );
}
export default AvatarName;
