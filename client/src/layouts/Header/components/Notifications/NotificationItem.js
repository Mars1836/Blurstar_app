import React, { useEffect, useState } from "react";
import Avatar from "~/components/Avatar";
import Button from "~/components/Button";
import postRequest from "~/httprequest/post";
import userRequest from "~/httprequest/user";
import PostDialog from "~/pages/Home/Component/Post/PostDialog";
import notifications from "~/configs/notification";
import { useDispatch, useSelector } from "react-redux";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
import styles from "./Notifications.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function NotificationItem({
  userId,
  postId,
  commentId,
  type,
  createAt,
  seen,
  id,
}) {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const _userId = useSelector((state) => state.mainUser.data._id);
  useEffect(() => {
    console.log(type);
    switch (type) {
      case notifications.likePost:
        setText("like your post ");
        break;
      case notifications.commentPost:
        setText("commented your post");
        break;
      case notifications.replyComment:
        setText("replied your comment");
        break;
      case notifications.follow:
        setText("followed you");
        break;
      case notifications.upPost:
        setText("posted new posts");
      default:
        break;
    }
  }, []);
  useEffect(() => {
    if (userId) {
      userRequest.findById(userId).then(({ data }) => {
        setUser(data);
      });
    }
  }, [userId, postId]);

  function getDate(date) {
    const s = (new Date() - new Date(date)) / 1000;
    let t;
    if (s > 86400) {
      t = Math.round(s / (3600 * 24)) + " day ago";
    } else if (s > 3600) {
      t = Math.round(s / 3600) + " hours ago";
    } else if (s > 60) {
      t = Math.round(s / 60) + " minutes ago";
    } else {
      t = 1 + "m";
    }
    return t;
  }
  return (
    <Button
      dialog={<PostDialog postId={postId}></PostDialog>}
      className={cx("noti_item_wrapper")}
      onClick={() => {
        dispatch(mainUserApiAction.fetchSeenNotify(_userId, id));
      }}
    >
      <div>
        <Avatar username={user?.name} url={user?.avatar} size={40}></Avatar>
      </div>
      <span
        className={cx("noti_item_content")}
        style={{
          display: "block",
          fontWeight: 350,
          width: "100%",
          fontSize: "1.05em",
          color: "var(--ig-secondary-text)",
        }}
      >
        <span className={cx("noti_item_username")}>{user?.username}</span>{" "}
        {text}
        <div className={cx("noti_item_time")}>{getDate(createAt)}</div>
      </span>
      <div
        className={cx("noti_item_status")}
        style={{
          background: seen ? "var(--light-gray)" : "var(--light-red)",
        }}
      ></div>
    </Button>
  );
}

export default NotificationItem;
