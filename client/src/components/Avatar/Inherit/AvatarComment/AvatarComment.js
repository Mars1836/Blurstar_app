import styles from "./AvatarComment.module.scss";
import classNames from "classnames/bind";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "~/components/Button";
import { useState } from "react";
import commentRequest from "~/httprequest/comment";
import { IconButton } from "@mui/material";
import Menu from "~/components/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useUser } from "~/services/RequireAuth";
import socket from "~/SocketIO/socket";
const cx = classNames.bind(styles);
function AvatarComment({ size, user, showName, showReply, comment }) {
  const { user: mainUser } = useUser();
  const content = useRef(null);
  const [time, setTime] = useState();
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    content.current.innerText = comment.content;
    const date = new Date(comment.createdAt);
    const current = new Date();
    setTime(handleSeconds((current - date) / 1000));
  }, []);
  useEffect(() => {
    if (mainUser._id === comment.userid) {
      setIsAuthor(true);
    }
  }, [user]);
  function handleSeconds(s) {
    let t;
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
      <div className={cx("container")}>
        <span className={cx("content")}>
          {showName && (
            <Link
              to={`/profile/${user?.username}`}
              className={cx("user-name")}
              style={{ fontSize: `${size / 2.3}px` }}
            >
              {user?.username}
            </Link>
          )}
          <span ref={content}></span>
          <div className={cx("option")}>
            <Menu
              placement="right"
              offset={[0, 10]}
              items={
                isAuthor
                  ? [
                      {
                        title: "Remove comment",
                        action: () => {
                          commentRequest
                            .removeComment(comment._id)
                            .then(({ data }) => {
                              socket.emit("remove-comment", comment._id);
                            });
                        },
                      },
                    ]
                  : []
              }
            >
              <IconButton aria-label="option">
                <MoreHorizIcon></MoreHorizIcon>
              </IconButton>{" "}
            </Menu>
          </div>
        </span>
        <span className={cx("bottom-comment")}>
          <Button
            onClick={() => {
              showReply();
            }}
          >
            Reply
          </Button>
          <span>{time}</span>
        </span>
      </div>
    </div>
  );
}
export default AvatarComment;
