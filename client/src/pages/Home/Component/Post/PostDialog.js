import styles from "./Post.module.scss";
import Avatar from "../../../../components/Avatar/Avatar.js";
import classNames from "classnames/bind";
import { useEffect, useRef, useState, createRef } from "react";
import AvatarName from "../../../../components/Avatar/Inherit/AvatarName/AvatarName.js";
import Comment from "./Comment.js";
import userRequest from "../../../../httprequest/user.js";
import postRequest from "../../../../httprequest/post.js";
import Interaction from "./Interaction.js";
import socket from "../../../../SocketIO/socket.js";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Button from "../../../../components/Button/Button.js";
import "./custem.css";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Menu from "../../../../components/Menu/Menu.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HideSourceRoundedIcon from "@mui/icons-material/HideSourceRounded";
import LoadingComment from "~/components/Loading/LoadingComment/index.js";
import CommentInput from "../CommentInput/CommentInput.js";
import commentRequest from "~/httprequest/comment.js";
import Text from "./Text.js";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import { useDispatch, useSelector } from "react-redux";
import { postApiAction, postAction } from "~/store/actions/postAction";
const cx = classNames.bind(styles);
function PostDialog({ postId: _postId, remove, status }) {
  const userid = useSelector((state) => state.mainUser.data._id);
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.posts.byId[_postId]?._id);
  if (!postId) {
    dispatch(postApiAction.postFetchApi([_postId]));
  }
  const comments = useSelector((state) => state.posts.byId[_postId]?.comments);
  const authorID = useSelector((state) => state.posts.byId[_postId]?.author);
  const content = useSelector((state) => state.posts.byId[_postId]?.content);
  const createdAt = useSelector(
    (state) => state.posts.byId[_postId]?.createdAt
  );
  const commentsloaded =
    useSelector((state) => state.posts.byId[_postId]?.commentData) || {};
  const [author, setAuthor] = useState();
  const [isCommentMount, setIsCommentMount] = useState(true);
  const [date, setDate] = useState("");
  const [isLoadingComment, setIsLoadingComment] = useState(true);
  const [isShowAllCap, setIsShowAllCap] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const [imageScene, setImageScene] = useState(false);
  const isAuthor = userid === authorID;
  const inputComment = createRef();
  let text = useRef("");
  let text2 = useRef("");
  const limitComment = 4;
  useEffect(() => {
    let rsDate;
    if (postId) {
      userRequest.findById(authorID).then(({ data }) => {
        setAuthor(data);
      });
      let characterLimit = 250;
      let lineLimit = 4;
      let indexline = getIndex("\n", content?.cap || "", lineLimit);
      text.current = content?.cap.slice(0, characterLimit);
      if (indexline > 0) {
        text.current = content?.cap.slice(0, indexline);
        text2.current = content?.cap.slice(indexline, content?.cap.length);
      } else {
        text.current = content?.cap.slice(0, characterLimit);
        text2.current = content?.cap.slice(characterLimit, content?.cap.length);
      }

      setDate(getDate());
      rsDate = setInterval(() => {
        setDate(getDate());
      }, 60 * 1000);
    }

    return () => {
      clearInterval(rsDate);
    };
  }, [postId]);
  useEffect(() => {
    if (postId) {
      commentRequest
        .getListComment(comments, -1, commentPage, limitComment)
        .then(({ data }) => {
          dispatch(
            postAction.loadCommentPost({
              commentsloaded: data,
              postId: _postId,
            })
          );
        });
    }
  }, [postId, commentPage]);
  const postContent = useRef(null);
  function getIndex(char, string, index) {
    if (index === 1) {
      return string.indexOf(char);
    }
    let i = getIndex(char, string, index - 1) + 1;
    if (i > 0) {
      return string.indexOf(char, i);
    } else {
      return -1;
    }
  }
  function getDate(short = 1) {
    if (short) {
      const options = {
        minute: "numeric",
        hour: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const date = Intl.DateTimeFormat("en", options).format(
        Date.parse(createdAt)
      );
      const timeCreated = Date.parse(createdAt);
      const current = new Date();
      let diff = (current - timeCreated) / 1000;
      let time;
      if (diff < 3600 * 24) {
        if (diff < 3600) {
          if (diff < 60) {
            time = "a few seconds";
            return time;
          }
          time = Math.floor(diff / 60) + "m";
          return time;
        }
        time = Math.floor(diff / 3600) + "h";
        return time;
      }
      return date;
    } else {
      const options = {
        minute: "numeric",
        hour: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
      };
      const date = Intl.DateTimeFormat("en", options).format(
        Date.parse(createdAt)
      );
      return date;
    }
  }
  const userOptions = [
    {
      title: "Hide",
      icon: (
        <HideSourceRoundedIcon sx={{ fontSize: 20 }}></HideSourceRoundedIcon>
      ),
    },
    {
      title: "Save",
      icon: <BookmarkIcon sx={{ fontSize: 20 }}></BookmarkIcon>,
    },
  ];
  const authorOptions = [
    { title: "Edit", icon: <EditIcon sx={{ fontSize: 20 }}></EditIcon> },
    {
      title: "Save",
      icon: <BookmarkIcon sx={{ fontSize: 20 }}></BookmarkIcon>,
    },
    {
      title: "Remove",
      icon: <DeleteIcon sx={{ fontSize: 20 }}></DeleteIcon>,
      action: () => {
        dispatch(postApiAction.fetchRemovePost(_postId));
      },
    },
  ];

  return (
    <div
      className={cx("post", "post-dialog")}
      onClick={(e) => {
        e.stopPropagation();
      }}
      status={status}
    >
      <div className={cx("post-item")}>
        {!imageScene ? (
          <>
            {content.data && (
              <div
                className={cx("wapper-image")}
                onClick={() => {
                  setImageScene(true);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <img src={content.data} className={cx("post-image")}></img>
              </div>
            )}
            <div className={cx("post-cap")}>
              <div className={cx("post-head")}>
                <AvatarName
                  username={author?.username}
                  url={author?.avatar}
                  size={35}
                  status={
                    <Tippy
                      content={getDate(0)}
                      placement="bottom-start"
                      theme="tomato"
                      arrow={false}
                      offset={[-10, 0]}
                    >
                      <Button text={1}>{date}</Button>
                    </Tippy>
                  }
                ></AvatarName>
                <Menu items={isAuthor ? authorOptions : userOptions}>
                  <IconButton size="small">
                    <MoreHorizIcon fontSize="large"></MoreHorizIcon>
                  </IconButton>
                </Menu>
              </div>
              <div className={cx("cap")}>
                <span className={cx("post-content")} ref={postContent}>
                  <Text text={text.current}></Text>
                  {text2.current && (
                    <>
                      {isShowAllCap ? (
                        <Text text={text2.current}></Text>
                      ) : (
                        <Button
                          style={{ color: "#ba2121", display: "inline-block" }}
                          onClick={() => {
                            setIsShowAllCap(true);
                          }}
                        >
                          ...See more
                        </Button>
                      )}
                    </>
                  )}
                </span>
              </div>
              <Interaction
                inputComment={inputComment}
                postId={_postId}
                commentsQuantity={comments.length}
                handleCommentMount={{ setIsCommentMount, isCommentMount }}
              />
              {comments && isCommentMount && (
                <div className={cx("comment-site")}>
                  <CommentInput
                    post={true}
                    ref={inputComment}
                    postId={_postId}
                  ></CommentInput>
                  <div className={cx("comment-users")}>
                    {commentsloaded !== null && (
                      <>
                        {commentsloaded.allIds.map((id, index) => {
                          return (
                            <Comment
                              data={commentsloaded.byId[id]}
                              key={id}
                              setLoading={setIsLoadingComment}
                              setLoadingComment={
                                index === commentsloaded.allIds?.length - 1
                                  ? () => {
                                      setIsLoadingComment(false);
                                    }
                                  : ""
                              }
                            ></Comment>
                          );
                        })}
                        {isLoadingComment &&
                          commentsloaded.allIds?.length > 0 && (
                            <LoadingComment></LoadingComment>
                          )}
                      </>
                    )}
                  </div>
                  {comments.length > commentsloaded.allIds?.length && (
                    <div className={cx("loadmore")}>
                      <Button
                        underline={1}
                        onClick={() => {
                          setCommentPage(commentPage + 1);
                        }}
                      >
                        View more comments
                      </Button>
                      <p>
                        {commentsloaded.allIds?.length} of {comments.length}
                      </p>
                    </div>
                  )}

                  {comments?.length > 5 && (
                    <Button
                      underline={1}
                      onClick={() => {
                        inputComment.current?.focus({ preventScroll: true });
                        inputComment.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      Write a comment...
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {content.data && (
              <div className={cx("wapper-image")}>
                <span
                  className={cx("zoom-out-button")}
                  onClick={() => {
                    setImageScene(false);
                  }}
                >
                  <ZoomInMapIcon
                    sx={{
                      fontSize: "24px",
                      color: "#fff",
                      witdh: "24px",
                      height: "24px",
                    }}
                  ></ZoomInMapIcon>
                </span>
                <img src={content.data} className={cx("post-image")}></img>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default PostDialog;
