import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Main from "../Main/Main";
import SidebarLeft from "../SidebarLeft";
import "~/styles/grid.css";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("default_layout")}>
      <Header></Header>
      <div className={cx("content")}>
        <SidebarLeft></SidebarLeft>
        <Main>{children}</Main>
      </div>
    </div>
  );
}

export default DefaultLayout;
