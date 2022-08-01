import styles from "./AvatarComment.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
const cx = classNames.bind(styles);
function AvatarComment({ size, user, showName, children }) {
  const content = useRef(null);
  useEffect(() => {
    content.current.innerText = children;
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        <Avatar size={size || 30} user={user} link></Avatar>
      </div>

      <span className={cx("content")}>
        {showName && (
          <Link
            to={`/profile/${user?.username}`}
            className={cx("user-name")}
            style={{ fontSize: `${size / 2}px` }}
          >
            {user?.name}
          </Link>
        )}
        <span ref={content}></span>
      </span>
    </div>
  );
}
export default AvatarComment;
