import React from "react";
import styles from "./Notifications.module.scss";
import classNames from "classnames/bind";
import { IconButton } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useState } from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
const cx = classNames.bind(styles);
function Notification() {
  const [filter, setFilter] = useState("ALL");
  const dispatch = useDispatch();
  const notifications =
    useSelector((state) => state.mainUser.data?.notifications) || [];
  const notificationsId = notifications.map((n) => {
    return n.id;
  });
  const userId = useSelector((state) => state.mainUser?.data?._id);
  const handleFilter = (type) => {
    setFilter(type);
  };

  return (
    <div className={cx("noti_wrapper")}>
      <div className={cx("noti_title")}>
        <h2 className={cx("noti_title_text")}>Notifications</h2>
        <div className={cx("noti_options")}>
          <Tippy content="mark all as read" placement="bottom" theme="tomato">
            <IconButton
              size="small"
              onClick={() => {
                dispatch(
                  mainUserApiAction.fetchSeenNotify(userId, notificationsId)
                );
              }}
            >
              <FactCheckIcon fontSize="large"></FactCheckIcon>
            </IconButton>
          </Tippy>
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
