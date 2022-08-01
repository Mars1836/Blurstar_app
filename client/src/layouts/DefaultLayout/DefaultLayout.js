import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState, createContext, useContext } from "react";
const cx = classNames.bind(styles);
const lockContext = createContext(null);
function DefaultLayout({ children }) {
  const [isLock, setIsLock] = useState(false);
  return (
    <lockContext.Provider value={setIsLock}>
      <div
        className={cx("default_layout")}
        style={
          isLock
            ? {
                overflow: "hidden",
                height: "100vh",
              }
            : {}
        }
      >
        <Header></Header>
        <div className={cx("content")}>
          <Sidebar>{children}</Sidebar>
        </div>
      </div>
    </lockContext.Provider>
  );
}
export const useLock = () => {
  const setLock = useContext(lockContext);
  return setLock;
};
export default DefaultLayout;
