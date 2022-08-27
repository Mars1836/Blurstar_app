import styles from "./AvatarComment.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "~/components/Button";
import { useState } from "react";
const cx = classNames.bind(styles);
function AvatarComment({ size, user, showName, children, comment }) {
  const content = useRef(null);
  const [time, setTime] = useState();
  const [isCommentReply, setIsCommentReply] = useState(false);
  useEffect(() => {
    content.current.innerText = comment.content;
    const date = new Date(comment.createAt);
    const current = new Date();
    setTime(handleSeconds((current - date) / 1000));
  }, []);
  function handleSeconds(s) {
    let t;
    console.log(s);
    if (s > 86400) {
      t = Math.round(s / (3600 * 24)) + "d";
      console.log("hehe");
    } else if (s > 3600) {
      t = Math.round(s / 3600) + "h";
    } else if (s > 60) {
      t = Math.round(s / 60) + "m";
    } else {
      t = 1 + "m";
    }
    return t;
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        <Avatar size={size || 30} user={user} link></Avatar>
      </div>
      <div>
        <span className={cx("content")}>
          {showName && (
            <Link
              to={`/profile/${user?.username}`}
              className={cx("user-name")}
              style={{ fontSize: `${size / 2}px` }}
            >
              {user?.username}
            </Link>
          )}
          <span ref={content}></span>
        </span>
        <span className={cx("bottom-comment")}>
          <Button>Reply</Button>
          <span>{time}</span>
        </span>
      </div>
    </div>
  );
}
export default AvatarComment;
