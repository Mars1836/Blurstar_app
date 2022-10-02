import React from "react";
import styles from "./Notifications.module.scss";
import classNames from "classnames/bind";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
const cx = classNames.bind(styles);
function Notification() {
  const [filter, setFilter] = useState("ALL");
  const notifications =
    useSelector((state) => state.mainUser.data?.notifications) || [];
  const handleFilter = (type) => {
    setFilter(type);
  };
  return (
    <div className={cx("noti_wrapper")}>
      <div className={cx("noti_title")}>
        <h2 className={cx("noti_title_text")}>Notifications</h2>
        <div className={cx("noti_options")}>
          <IconButton size="small">
            <MoreHorizIcon fontSize="large"></MoreHorizIcon>
          </IconButton>
        </div>
      </div>
      <div className={cx("noti_filter")}>
        <button
          className={cx("noti_filter_button", filter === "ALL" && "active")}
          onClick={() => {
            handleFilter("ALL");
          }}
        >
          All
        </button>
        <button
          className={cx("noti_filter_button", filter === "UNREAD" && "active")}
          onClick={() => {
            handleFilter("UNREAD");
          }}
        >
          Unread
        </button>
      </div>
      <div className={cx("noti_list_items")}>
        {notifications
          .filter((noti) => {
            return filter === "ALL" ? true : noti.seen === false;
          })
          .map((noti) => {
            return (
              <NotificationItem {...noti} key={noti.id}></NotificationItem>
            );
          })}
      </div>
    </div>
  );
}

export default Notification;
