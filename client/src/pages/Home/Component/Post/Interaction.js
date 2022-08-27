import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";
import { BiCommentDetail } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import postRequest from "../../../../httprequest/post";
import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import LikeModel from "../../../../components/Model/components/Like/LikeModel";
import userRequest from "~/httprequest/user";
const cx = classNames.bind(styles);
function Interaction({
  like,
  postId,
  setLike,
  user,
  likes,
  commentsQuantity,
  commentInput,
  handleCommentMount,
}) {
  const [isLiked, setIsLiked] = useState(like);
  const [likeNum, setLikeNum] = useState(likes.length);
  const [listUsersLike, setListUsersLike] = useState();
  useEffect(() => {
    userRequest.getUsersLike(postId).then(({ data }) => {
      setListUsersLike(data);
    });
  }, []);
  useEffect(() => {
    setIsLiked(like);
  }, [like]);
  const handleLike = async () => {
    await postRequest.likePost(postId, user._id);
    setIsLiked(!isLiked);
    isLiked ? setLikeNum(likeNum - 1) : setLikeNum(likeNum + 1);
  };
  const handleComment = () => {
    handleCommentMount.setIsCommentMount(true);
    if (commentInput.current) {
      commentInput.current.focus();
    }
  };
  return (
    <>
      <div className={cx("figure")}>
        <Button
          dialog={
            <LikeModel listUser={userRequest.getUsersLike(postId)}></LikeModel>
          }
          onClick={() => {
            console.log("active");
          }}
        >
          <div
            className={cx("like-num")}
            style={likeNum ? { color: "var(--light-red)" } : {}}
          >
            {" "}
            {likeNum} Likes
          </div>
        </Button>
        <div className={cx("cmsh")}>
          <Button
            text={1}
            onClick={() => {
              handleCommentMount.setIsCommentMount(
                !handleCommentMount.isCommentMount
              );
            }}
          >
            <div className={cx("cs-num")}>{commentsQuantity} Comments</div>
          </Button>
          <Button text={1}>
            <div className={cx("cs-num")}>0 Shares</div>
          </Button>
        </div>
      </div>
      <div className={cx("interaction")}>
        <div
          className={cx("inter-wapper")}
          style={
            handleCommentMount.isCommentMount
              ? {
                  borderBottom: "1px solid lightgray",
                }
              : {}
          }
        >
          <IconContext.Provider
            value={{
              size: "2rem",
              className: "global-class-name",
            }}
          >
            <button onClick={handleLike}>
              {!isLiked ? (
                <>
                  <span className={cx("iconLike")}>
                    <i
                      style={{
                        backgroundImage:
                          'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/rxtG8wB7mfg.png")',
                        backgroundPosition: "0px -310px",
                        backgroundSize: "26px 834px",
                        width: "18px",
                        height: "18px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                        filter: "var(--filter-gray)",
                      }}
                    ></i>{" "}
                  </span>
                  Like
                </>
              ) : (
                <>
                  <span className={cx("iconLiked")}>
                    <i
                      style={{
                        backgroundImage:
                          'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/rxtG8wB7mfg.png")',
                        backgroundPosition: "0px -290px",
                        backgroundSize: "26px 834px",
                        width: "18px",
                        height: "18px",
                        filter: "var(--filter-accent)",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    ></i>
                  </span>
                  <p style={{ color: "var(--light-red)" }}>Like</p>
                </>
              )}
            </button>
            <button onClick={handleComment}>
              <i
                data-visualcompletion="css-img"
                className="gneimcpu a3axapz1"
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/rxtG8wB7mfg.png")',
                  backgroundPosition: "0px -270px",
                  backgroundSize: "26px 834px",
                  width: "18px",
                  height: "18px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "var(--filter-gray)",
                }}
              />
              Comment
            </button>
            <button>
              <i
                data-visualcompletion="css-img"
                className="gneimcpu oee9glnz"
                style={{
                  backgroundImage:
                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/rxtG8wB7mfg.png")',
                  backgroundPosition: "0px -330px",
                  backgroundSize: "26px 834px",
                  width: "18px",
                  height: "18px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  filter: "var(--filter-gray)",
                }}
              ></i>
              Share
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}
export default Interaction;
