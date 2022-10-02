import React from "react";
import styles from "./CommentInput.module.scss";
import classNames from "classnames/bind";
import postRequest from "~/httprequest/post";
import Avatar from "~/components/Avatar";
import commentRequest from "~/httprequest/comment";
import { useSelector } from "react-redux";
import { postApiAction } from "~/store/actions/postAction";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const CommentInput = React.forwardRef(({ post, comment, postId }, ref) => {
  const userid = useSelector((state) => state.mainUser.data?._id);
  const userUsername = useSelector((state) => state.mainUser.data?.username);
  const userAvatar = useSelector((state) => state.mainUser.data?.avatar);
  const authorPost = useSelector((state) => state.posts.byId[postId]?.author);
  const dispatch = useDispatch();
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
        userid: userid,
        content: cmt,
      };
      if (post) {
        dispatch(
          postApiAction.fetchCommentPost(newComment, postId, authorPost)
        );
      }
      if (comment) {
        commentRequest
          .addComment(comment._id, newComment)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
      e.target.innerText = "";
    } else if (keyPress[0] === "Enter" && cmt === "") {
      e.preventDefault();
    }
  };
  return (
    <div className={cx("comment-input-wrapper")}>
      <Avatar size={35} username={userUsername} url={userAvatar}></Avatar>
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
});
export default CommentInput;
