import styles from "./PostSite.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { ModelContext } from "../../Model";
import AvatarName from "../../../Avatar/Inherit/AvatarName/AvatarName";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Button as ButtonMaterial } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSelector, useDispatch } from "react-redux";
import { postApiAction } from "~/store/actions/postAction";
const cx = classNames.bind(styles);
function PostSite() {
  const [postDisable, setPostDisable] = useState(true);
  const [postContent, setPostContent] = useState({ cap: "", data: "" });
  const [dataPost, setDataPost] = useState("");
  const [dataURL, setDataURL] = useState("");
  const contentInput = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.mainUser.data._id);
  const userAvatar = useSelector((state) => state.mainUser.data.avatar);
  const userUserName = useSelector((state) => state.mainUser.data.username);
  const userFollowers = useSelector((state) => state.mainUser.data.followers);

  const userName = useSelector((state) => state.mainUser.data.name);
  const { handleClose } = useContext(ModelContext);
  useEffect(() => {
    contentInput.current.focus();
    function getDataFromLocalStorage() {
      let data = JSON.parse(localStorage.getItem("postContent")) || {
        cap: "",
        data: "",
      };
      let url = localStorage.getItem("dataURL") || "";
      setPostContent(data);
      setDataURL(url);
      contentInput.current.value = data.cap;
    }
    getDataFromLocalStorage();
  }, []);
  useEffect(() => {
    if (postContent.cap || postContent.data) {
      setPostDisable(false);
    } else {
      setPostDisable(true);
    }
    localStorage.setItem("postContent", JSON.stringify(postContent));
  }, [postContent]);
  useEffect(() => {
    if (dataPost) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(dataPost);
        reader.onloadend = () => {
          setDataURL(reader.result);
        };
      } catch (error) {
        console.log(error);
      }
    }
  }, [dataPost]);
  useEffect(() => {
    localStorage.setItem("dataURL", dataURL);
  }, [dataURL]);
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleSubmit = (e) => {
    const newPost = {
      author: userId,
      content: postContent,
    };

    dispatch(postApiAction.fetchCreatePost(newPost, dataURL, userFollowers));
    localStorage.removeItem("postContent");
    localStorage.removeItem("dataURL");
    handleClose();
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
        <AvatarName
          url={userAvatar}
          username={userUserName}
          size={35}
        ></AvatarName>
      </div>
      <div className={cx("content-post")}>
        <textarea
          name="cap"
          ref={contentInput}
          placeholder="What's on your mind?"
          className={cx("content-input")}
          onChange={handlePostContentChange}
        ></textarea>
        <div className={cx("photo-wapper")}>
          <div htmlFor="upload-photo" className={cx("label-upload-photo")}>
            <ButtonMaterial
              component="label"
              variant="contained"
              size="large"
              startIcon={<AddToPhotosIcon />}
              className={cx("button-material")}
            >
              Upload Photo
              <input
                type="file"
                className={cx("file-input")}
                name="data"
                onChange={(e) => {
                  handlePostContentChange(e);
                  handleData(e);
                }}
              ></input>
            </ButtonMaterial>

            {dataURL && (
              <ButtonMaterial
                color="error"
                size="large"
                variant="contained"
                sx={{ padding: 0, minWidth: 30, height: 30 }}
                onClick={() => {
                  setDataURL("");
                  setDataPost("");
                }}
              >
                <HighlightOffIcon size="large" sx={{ fontSize: 20 }} />
              </ButtonMaterial>
            )}
          </div>
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
