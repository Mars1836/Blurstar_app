import { useUser } from "../../../../services/RequireAuth.js";
import styles from "./Post.module.scss";
import Avatar from "../../../../components/Avatar/Avatar.js";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
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
const cx = classNames.bind(styles);

function Post({ data }) {
  const { user } = useUser();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState("");
  const isAuthor = data.author === user._id;
  console.log(isAuthor);
  useEffect(() => {
    setLiked(data.likes.includes(user._id));
    console.log(1);
  }, [liked]);
  useEffect(() => {
    userRequest.findById(data.author).then(({ data }) => {
      setAuthor(data);
    });
    setComments(data.comments);
    postContent.current.innerText = data.content.cap;
    socket.on("get-comment", (comment) => {
      setComments((comments) => [comment, ...comments]);
    });
    setDate(getDate());
    const rsDate = setInterval(() => {
      setDate(getDate());
    }, 60 * 1000);
    return () => {
      clearInterval(rsDate);
    };
  }, []);
  const postContent = useRef(null);

  const commentInput = useRef(null);
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
      postRequest.addComment(data._id, newComment).then(({ data }) => {
        socket.emit("comment", data);
      });
      e.target.innerText = "";
    } else if (keyPress[0] === "Enter" && cmt === "") {
      e.preventDefault();
    }
  };
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
        console.log(1);
      },
    },
  ];
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
          <span className={cx("post-content")} ref={postContent}></span>
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
          postId={data._id}
          setLike={setLiked}
          commentInput={commentInput}
        />
        <div className={cx("comment-site")}>
          <div className={cx("comment-input-wrapper")}>
            <Avatar size={35} user={user}></Avatar>
            <div className={cx("comment-input-container")}>
              <span
                ref={commentInput}
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
          <div className={cx("comment-users")}>
            {comments.map((comment) => {
              return <Comment data={comment} key={comment._id}></Comment>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
