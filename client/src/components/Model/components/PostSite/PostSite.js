import styles from "./PostSite.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../Button/Button";
import Avatar from "../../../Avatar";
import { useUser } from "../../../../services/RequireAuth";
import postRequest from "../../../../httprequest/post";
import { ModelContext } from "../../Model";
import AvatarName from "../../../Avatar/Inherit/AvatarName/AvatarName";
import socket from "../../../../SocketIO/socket";
const cx = classNames.bind(styles);
function PostSite() {
  const [postDisable, setPostDisable] = useState(true);
  const [postContent, setPostContent] = useState({ cap: "", data: "" });
  const [dataPost, setDataPost] = useState("");
  const [dataURL, setDataURL] = useState("");
  const contentInput = useRef(null);
  const { user } = useUser();
  const { setClose } = useContext(ModelContext);
  useEffect(() => {
    contentInput.current.focus();
  }, []);
  useEffect(() => {
    if (postContent.cap || postContent.data) {
      setPostDisable(false);
    } else {
      setPostDisable(true);
    }
  }, [postContent]);
  useEffect(() => {
    if (dataPost) {
      const reader = new FileReader();
      reader.readAsDataURL(dataPost);
      reader.onloadend = () => {
        setDataURL(reader.result);
      };
    }
  }, [dataPost]);
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleSubmit = (e) => {
    const newPost = {
      author: user._id,
      content: postContent,
    };
    postRequest.createPost(newPost, dataURL).then(({ data }) => {
      socket.emit("up-post", data);
      console.log("up-post");
    });
    setClose(false);
  };
  const handleData = (e) => {
    setDataPost(e.target.files[0]);
  };
  const handlePostContentChange = (e) => {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <div
      className={cx("wrapper")}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={cx("title")}>Create new post</div>
      <div className={cx("user")}>
        <AvatarName user={user} size={35}></AvatarName>
      </div>
      <div className={cx("content-post")}>
        <textarea
          name="cap"
          ref={contentInput}
          placeholder="What's on your mind?"
          className={cx("content-input")}
          onChange={handlePostContentChange}
        ></textarea>
        <input
          type="file"
          className={cx("file-input")}
          name="data"
          onChange={(e) => {
            handlePostContentChange(e);
            handleData(e);
          }}
        ></input>
        <div>
          {dataURL && <img src={dataURL} className={cx("data-post")}></img>}
        </div>
      </div>
      <button
        className={cx("post-btn")}
        onClick={handleSubmit}
        disabled={postDisable}
      >
        Post
      </button>
    </div>
  );
}
export default PostSite;
