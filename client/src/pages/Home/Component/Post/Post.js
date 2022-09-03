import { useUser } from "../../../../services/RequireAuth.js";
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
const cx = classNames.bind(styles);
function Post({ data, remove }) {
  const { user } = useUser();
  const [post, setPost] = useState(data);
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState(null);
  const [isCommentMount, setIsCommentMount] = useState(false);
  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState("");
  const [isLoadingComment, setIsLoadingComment] = useState(true);
  const [isShowAllCap, setIsShowAllCap] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const inputComment = createRef();
  let text = useRef("");
  let text2 = useRef("");
  const limitComment = 4;
  const isAuthor = data.author === user?._id;
  useEffect(() => {
    setLiked(data.likes.includes(user?._id));
  }, [liked]);
  useEffect(() => {
    userRequest.findById(data.author).then(({ data }) => {
      setAuthor(data);
    });
    let cap = data.content.cap;
    let characterLimit = 250;
    let lineLimit = 4;
    let indexline = getIndex("\n", cap, lineLimit);
    text.current = cap.slice(0, characterLimit);
    if (indexline > 0) {
      text.current = cap.slice(0, indexline);
      text2.current = cap.slice(indexline, cap.length);
    } else {
      text.current = cap.slice(0, characterLimit);
      text2.current = cap.slice(characterLimit, cap.length);
    }
    socket.on("get-comment", (comment, postId) => {
      if (data._id === postId) {
        console.log(comment);
        setComments((comments) => [comment, ...comments]);
        setPost((post) => {
          return { ...post, comments: [comment._id, ...post.comments] };
        });
        console.log(post);
      }
    });
    setDate(getDate());
    const rsDate = setInterval(() => {
      setDate(getDate());
    }, 60 * 1000);
    return () => {
      clearInterval(rsDate);
    };
  }, []);
  useEffect(() => {
    commentRequest
      .getListComment(data.comments, -1, commentPage, limitComment)
      .then(({ data }) => {
        if (comments !== null) {
          setComments([...comments, ...data]);
        } else {
          setComments(data);
        }
      });
  }, [commentPage]);
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
        Date.parse(data?.createdAt)
      );
      const timeCreated = Date.parse(data?.createdAt);
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
        Date.parse(data?.createdAt)
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
        remove(data._id);
      },
    },
  ];

  function removeFromListParent(id) {
    const arr = comments.filter((comment) => {
      return comment._id !== id;
    });
    setComments(arr);
  }
  return (
    <div className={cx("post")}>
      <div className={cx("post-item")}>
        <div className={cx("post-head")}>
          <AvatarName
            user={author}
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
        {data.content.data && (
          <div className={cx("wapper-image")}>
            <img src={data.content.data} className={cx("post-image")}></img>
          </div>
        )}
        <Interaction
          like={liked}
          likes={data.likes}
          user={user}
          inputComment={inputComment}
          postId={data._id}
          setLike={setLiked}
          commentsQuantity={post?.comments.length}
          handleCommentMount={{ setIsCommentMount, isCommentMount }}
        />
        {isCommentMount && (
          <div className={cx("comment-site")}>
            <CommentInput
              user={user}
              post={data}
              ref={inputComment}
              postId={post._id}
            ></CommentInput>
            <div className={cx("comment-users")}>
              {comments !== null && (
                <>
                  {comments.map((comment, index) => {
                    return (
                      <Comment
                        mainUser={user}
                        data={comment}
                        key={comment._id}
                        getRemove={removeFromListParent}
                        setLoading={setIsLoadingComment}
                        setLoadingComment={
                          index === comments.length - 1
                            ? () => {
                                setIsLoadingComment(false);
                              }
                            : ""
                        }
                      ></Comment>
                    );
                  })}
                  {isLoadingComment && comments.length > 0 && (
                    <LoadingComment></LoadingComment>
                  )}
                </>
              )}
            </div>
            {post?.comments.length > comments.length && (
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
                  {comments?.length} of {post?.comments.length}
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
    </div>
  );
}
export default Post;
