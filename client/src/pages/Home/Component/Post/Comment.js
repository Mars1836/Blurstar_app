import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, createRef } from "react";
import AvatarComment from "../../../../components/Avatar/Inherit/AvatarComment/AvatarComment";
import userRequest from "../../../../httprequest/user";
import commentRequest from "~/httprequest/comment";
import socket from "~/SocketIO/socket";
import Button from "~/components/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentInput from "../CommentInput";
const cx = classNames.bind(styles);

function Comment({
  data,
  getRemove,
  setLoadingComment,
  avtSize = 35,
  isReply = false,
  postId,
  commentParentId,
}) {
  const inputComment = createRef();
  const [comment, setComment] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [isShowReply, setIsShowReply] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const limitLoad = 6;

  useEffect(() => {
    userRequest
      .findById(data.userid)
      .then(({ data }) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("get-reply", (comment, commentId) => {
      if (data._id === commentId) {
        setComments((comments) => [...comments, comment]);
        setComment((pre) => {
          return { ...pre, comments: [...pre.comments, comment._id] };
        });
      }
    });
    socket.on("get-remove-comment", (commentId) => {
      if (commentId === data._id) {
        getRemove(commentId);
      }
    });
  }, []);
  useEffect(() => {
    if (!isLoading && typeof setLoadingComment === "function") {
      setLoadingComment();
    }
  }, [isLoading]);
  useEffect(() => {
    commentRequest
      .getListComment(data.comments, 1, commentPage, limitLoad)
      .then(({ data }) => {
        if (comments !== null) {
          setComments((comments) => {
            return [...comments, ...data];
          });
        } else {
          setComments((comments) => {
            return [...data];
          });
        }
      });
  }, [commentPage]);
  useEffect(() => {
    inputComment.current?.focus();
  }, [isShowReply]);

  function removeFromListParent(id) {
    setComment((cm) => {
      return {
        ...cm,
        comments: cm.comments.filter((commentId) => {
          return commentId !== id;
        }),
      };
    });
    setComments((cms) => {
      return cms.filter((cm) => {
        return cm._id !== id;
      });
    });
  }
  return (
    <>
      {!isLoading ? (
        <div className={cx("comment-wapper")}>
          <AvatarComment
            user={user}
            showName
            comment={data}
            size={avtSize || 35}
            postId={postId}
            isReply={isReply}
            showReply={() => {
              setIsShowReply(true);
            }}
            getRemove={removeFromListParent}
            commentParentId={commentParentId}
          >
            {data.content}
          </AvatarComment>
          <div
            className={cx("line")}
            style={
              isShowReply
                ? {
                    position: "absolute",
                    left: `${avtSize / 2 - 1}px`,
                    width: "1px",
                    top: `${avtSize}px`,
                    bottom: "50px",
                    backgroundColor: "#F0F2F5",
                  }
                : {}
            }
          ></div>
          {comments?.length > 0 && !isShowReply && (
            <div className={cx("reply-btn")}>
              <Button
                onClick={() => {
                  setIsShowReply(true);
                }}
              >
                <ReplyIcon
                  style={{
                    transform: "scale(-1,-1)",
                    color: "lightgray",
                    fontSize: "20px",
                  }}
                ></ReplyIcon>
                {comment.comments.length} Reply
              </Button>
            </div>
          )}
          {isShowReply && (
            <div className={cx("reply")}>
              {comments.length > 0 &&
                comments.map((cm) => {
                  return (
                    <div key={cm._id} style={{ position: "relative" }}>
                      <div
                        style={
                          isShowReply
                            ? {
                                position: "absolute",
                                left: `-${41 - avtSize / 2}px`,
                                width: "23px",
                                height: "23px",
                                top: `-5px`,
                                borderBottomLeftRadius: "10px",
                                borderLeft: "2px solid #F0F2F5",
                                borderBottom: "2px solid #F0F2F5",
                              }
                            : {}
                        }
                      ></div>
                      <Comment
                        data={cm}
                        avtSize={30}
                        isReply={true}
                        getRemove={removeFromListParent}
                        postId={postId}
                        commentParentId={comment._id}
                      ></Comment>
                    </div>
                  );
                })}
              {comment.comments.length > comments.length && (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: `-${41 - avtSize / 2}px`,
                      width: "23px",
                      height: "23px",
                      top: `-10px`,
                      borderBottomLeftRadius: "10px",
                      borderLeft: "2px solid #F0F2F5",
                      borderBottom: "2px solid #F0F2F5",
                    }}
                  ></div>
                  <Button
                    onClick={() => {
                      setCommentPage(commentPage + 1);
                    }}
                    underline={1}
                  >
                    View {comment.comments.length - comments.length} more
                    replies
                  </Button>
                </div>
              )}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: `-${41 - avtSize / 2}px`,
                    width: "23px",
                    height: "23px",
                    top: `-5px`,
                    borderBottomLeftRadius: "10px",
                    borderLeft: "2px solid #F0F2F5",
                    borderBottom: "2px solid #F0F2F5",
                  }}
                ></div>
                <CommentInput comment={data} ref={inputComment}></CommentInput>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Comment;
