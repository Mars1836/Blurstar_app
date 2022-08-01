import { useUser } from "../../../../services/RequireAuth.js";
import styles from "./Post.module.scss";
import Avatar from "../../../../components/Avatar/Avatar.js";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import AvatarName from "../../../../components/Avatar/Inherit/AvatarName/AvatarName.js";
import Comment from "./Comment.js";
import userRequest from "../../../../httprequest/user.js";
import postRequest from "../../../../httprequest/post.js";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";
import { BiCommentDetail } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import Interaction from "./Interaction.js";
const cx = classNames.bind(styles);

function Post({ data }) {
  const { user } = useUser();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(data.likes.includes(user._id));
  }, [liked]);
  useEffect(() => {
    userRequest.findById(data.author).then(({ data }) => {
      setAuthor(data);
    });
    setComments(data.comments);
    postContent.current.innerText = data.content.cap;
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
      return item != e.key;
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
      postRequest.addComment(data._id, newComment);
      setComments([...comments, newComment]);
      e.target.innerText = "";
    } else if (keyPress[0] === "Enter" && cmt === "") {
      e.preventDefault();
    }
  };
  return (
    <div className={cx("post")}>
      <div className={cx("post-item")}>
        <div className={cx("cap")}>
          <AvatarName user={author} size={35}></AvatarName>
          <span className={cx("post-content")} ref={postContent}></span>
        </div>
        <div className={cx("wapper-image")}>
          <img src={data.content.data} className={cx("post-image")}></img>
        </div>
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
            {comments.map((comment, index) => {
              return <Comment data={comment} key={index}></Comment>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
