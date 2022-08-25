import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import Avatar from "../../../../components/Avatar";
import AvatarComment from "../../../../components/Avatar/Inherit/AvatarComment/AvatarComment";
import userRequest from "../../../../httprequest/user";
const cx = classNames.bind(styles);
function Comment({ data, setLoadingComment }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
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
  }, []);
  useEffect(() => {
    if (!isLoading && typeof setLoadingComment === "function") {
      setTimeout(() => {
        setLoadingComment();
      }, 300);
    }
  }, [isLoading]);
  return (
    <>
      {!isLoading ? (
        <AvatarComment user={user} showName>
          {data.content}
        </AvatarComment>
      ) : (
        <p></p>
      )}
    </>
  );
}
export default Comment;
