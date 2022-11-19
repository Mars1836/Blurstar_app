import React from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import AvatarName from "~/components/Avatar/Inherit/AvatarName/AvatarName";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function SidebarLeft() {
  const username = useSelector((state) => {
    return state.mainUser.data?.username;
  });
  const avatar = useSelector((state) => {
    return state.mainUser.data?.avatar;
  });
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list")}>
        <li className={cx("item")}>
          <Link to={`/profile/${username}`}>
            <AvatarName
              username={username}
              url={avatar}
              size={35}
              underline=""
              isLink={false}
            ></AvatarName>
          </Link>
        </li>
        <li className={cx("item")}>
          <img
            src={`${process.env.PUBLIC_URL}/icon/friend.png`}
            className={cx("icon")}
            alt="friend"
          ></img>
          <p>Friend</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="group"
            src={`${process.env.PUBLIC_URL}/icon/group.png`}
            className={cx("icon")}
          ></img>
          <p>Group</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="marketplace"
            src={`${process.env.PUBLIC_URL}/icon/store.png`}
            className={cx("icon")}
          ></img>
          <p>Marketplace</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="watch"
            src={`${process.env.PUBLIC_URL}/icon/watch.png`}
            className={cx("icon")}
          ></img>
          <p>Watch</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="memorise"
            src={`${process.env.PUBLIC_URL}/icon/memorise.png`}
            className={cx("icon")}
          ></img>
          <p>Memorise</p>
        </li>
        <p className={cx("title")}>Your shortcuts</p>
        <li className={cx("item")}>
          <img
            alt="event"
            src={`${process.env.PUBLIC_URL}/icon/event.png`}
            className={cx("icon")}
          ></img>
          <p>Event</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="gaming"
            src={`${process.env.PUBLIC_URL}/icon/gaming.png`}
            className={cx("icon")}
          ></img>
          <p>Gaming</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="video"
            src={`${process.env.PUBLIC_URL}/icon/video.png`}
            className={cx("icon")}
          ></img>
          <p>Video</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="gallery"
            src={`${process.env.PUBLIC_URL}/icon/gallery.png`}
            className={cx("icon")}
          ></img>
          <p>Gallery</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="message"
            src={`${process.env.PUBLIC_URL}/icon/message.png`}
            className={cx("icon")}
          ></img>
          <p>Message</p>
        </li>
        <p className={cx("title")}>Others</p>
        <li className={cx("item")}>
          <img
            alt="tutorial"
            src={`${process.env.PUBLIC_URL}/icon/tutorial.png`}
            className={cx("icon")}
          ></img>
          <p>Tutorial</p>
        </li>
        <li className={cx("item")}>
          <img
            alt="course"
            src={`${process.env.PUBLIC_URL}/icon/course.png`}
            className={cx("icon")}
          ></img>
          <p>Course</p>
        </li>
      </ul>
    </div>
  );
}

export default SidebarLeft;
