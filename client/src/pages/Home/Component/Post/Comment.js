import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import Avatar from "../../../../components/Avatar";
import AvatarComment from "../../../../components/Avatar/Inherit/AvatarComment/AvatarComment";
import userRequest from "../../../../httprequest/user";
const cx = classNames.bind(styles);
function Comment({ data }) {
  const [comments, setComments] = useState(data);
  const [user, setUser] = useState({});
  useEffect(() => {
    userRequest
      .findById(data.userid)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AvatarComment user={user} showName>
      {data.content}
    </AvatarComment>
  );
}
export default Comment;
