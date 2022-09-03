import React from "react";
import styles from "./CommentInput.module.scss";
import classNames from "classnames/bind";
import { useRef, useEffect } from "react";
import postRequest from "~/httprequest/post";
import socket from "~/SocketIO/socket";
import Avatar from "~/components/Avatar";
import commentRequest from "~/httprequest/comment";
const cx = classNames.bind(styles);
const CommentInput = React.forwardRef(
  ({ user, post, comment, postId }, ref) => {
    let keyPress = [];
    const handleFocus = () => {
      keyPress = [];
    };
    const handleKeyDown = (e) => {
      if (
        !keyPress.find((item) => e.key === item) &&
        (e.key === "Shift" || e.key === "Enter")
      ) {
        keyPress.push(e.key);
      }
    };
    const handleKeyUp = (e) => {
      keyPress = keyPress.filter((item) => {
        return item !== e.key;
      });
    };
    const handleSubmit = (e) => {
      let cmt = e.target.innerText.trim();
      if (keyPress[0] === "Enter" && cmt !== "") {
        e.preventDefault();
        let newComment = {
          userid: user._id,
          content: cmt,
        };
        if (post) {
          postRequest.addComment(post._id, newComment).then(({ data }) => {
            socket.emit("comment", data, post._id);
          });
        }
        if (comment) {
          commentRequest
            .addComment(comment._id, newComment)
            .then(({ data }) => {
              socket.emit("reply", data, comment._id);
            });
        }
        e.target.innerText = "";
      } else if (keyPress[0] === "Enter" && cmt === "") {
        e.preventDefault();
      }
    };
    return (
      <div className={cx("comment-input-wrapper")}>
        <Avatar size={35} user={user}></Avatar>
        <div className={cx("comment-input-container")}>
          <span
            ref={ref}
            id={postId && postId}
            contentEditable
            placeholder="write a comment"
            className={cx("comment-input")}
            onKeyDown={(e) => {
              handleKeyDown(e);
              handleSubmit(e);
            }}
            onKeyUp={(e) => {
              handleKeyUp(e);
            }}
            onFocus={handleFocus}
          ></span>
        </div>
      </div>
    );
  }
);
export default CommentInput;
