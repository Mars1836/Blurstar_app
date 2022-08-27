import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Main from "../Main/Main";
import { createContext, useContext } from "react";
import "~/styles/grid.css";
const cx = classNames.bind(styles);
const lockContext = createContext(null);
function DefaultLayout({ children }) {
  return (
    <div className={cx("default_layout")}>
      <Header></Header>
      <div className={cx("content")}>
        <Main>{children}</Main>
      </div>
    </div>
  );
}
export const useLock = () => {
  const setLock = useContext(lockContext);
  return setLock;
};
export default DefaultLayout;
