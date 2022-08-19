import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState, createContext, useContext } from "react";
import "~/styles/grid.css";
const cx = classNames.bind(styles);
const lockContext = createContext(null);
function DefaultLayout({ children }) {
  return (
    <div className={cx("default_layout")}>
      <Header></Header>
      <div className={cx("content")}>
        <Sidebar>{children}</Sidebar>
      </div>
    </div>
  );
}
export const useLock = () => {
  const setLock = useContext(lockContext);
  return setLock;
};
export default DefaultLayout;
