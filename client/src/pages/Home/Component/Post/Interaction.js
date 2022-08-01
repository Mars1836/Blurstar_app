import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";
import { BiCommentDetail } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import postRequest from "../../../../httprequest/post";
import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import LikeModel from "../../../../components/Model/components/Like/LikeModel";
const cx = classNames.bind(styles);
function Interaction({ like, postId, setLike, user, likes, commentInput }) {
  const [isLiked, setIsLiked] = useState(like);
  const [likeNum, setLikeNum] = useState(likes.length);
  useEffect(() => {
    setIsLiked(like);
  }, [like]);
  const handleLike = async () => {
    await postRequest.likePost(postId, user._id);
    setIsLiked(!isLiked);
    isLiked ? setLikeNum(likeNum - 1) : setLikeNum(likeNum + 1);
  };
  const handleComment = () => {
    commentInput.current.focus();
  };
  return (
    <>
      {likeNum > 0 && (
        <Button
          dialog={<LikeModel postsId={postId}></LikeModel>}
          onClick={() => {
            console.log("active");
          }}
        >
          <div className={cx("interaction-num")}>{likeNum} likes</div>
        </Button>
      )}
      <div className={cx("interaction")}>
        <IconContext.Provider
          value={{
            size: "2rem",
            className: "global-class-name",
          }}
        >
          <button onClick={handleLike}>
            {isLiked ? (
              <>
                <HiThumbUp /> Liked
              </>
            ) : (
              <>
                <HiOutlineThumbUp /> Like
              </>
            )}
          </button>
          <button onClick={handleComment}>
            <BiCommentDetail />
            Comment
          </button>
        </IconContext.Provider>
      </div>
    </>
  );
}
export default Interaction;
