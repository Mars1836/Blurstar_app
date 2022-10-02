import styles from "./Post.module.scss";
import classNames from "classnames/bind";

import { IconContext } from "react-icons/lib";
import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import LikeModel from "../../../../components/Model/components/Like/LikeModel";
import userRequest from "~/httprequest/user";
import { useDispatch, useSelector } from "react-redux";
import { postAction, postApiAction } from "~/store/actions/postAction";
const cx = classNames.bind(styles);
function Interaction({
  postId,
  inputComment,
  commentsQuantity,
  handleCommentMount,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.mainUser.data._id);
  const likes = useSelector((state) => state.posts.byId[postId].likes) || [];
  const authorPost =
    useSelector((state) => state.posts.byId[postId].author) || [];
  const [isLiked, setIsLiked] = useState(likes.includes(userId));
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    return () => {
      console.log("clear");
    };
  }, []);

  useEffect(() => {
    if (inputComment.current) inputComment.current.focus();
  }, [handleCommentMount.isCommentMount]);

  const handleLike = async () => {
    setIsLiked((pre) => {
      return !pre;
    });
    if (isLiked) {
      dispatch(postApiAction.fetchUnlikePost(postId, userId));
    } else {
      console.log("like");
      dispatch(postApiAction.fetchLikePost(postId, userId, authorPost));
    }
  };
  const handleComment = () => {
    handleCommentMount.setIsCommentMount(true);
    if (inputComment.current) inputComment.current.focus();
  };
  return (
    <>
      <div className={cx("figure")}>
        <Button
          dialog={<LikeModel listUsers={listUsers}></LikeModel>}
          onClick={() => {
            userRequest.getUsersByListsId(likes).then(({ data }) => {
              setListUsers(data);
            });
          }}
        >
          <div
            className={cx("like-num")}
            style={likes?.length > 0 ? { color: "var(--light-red)" } : {}}
          >
            {" "}
            {likes?.length} Likes
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
