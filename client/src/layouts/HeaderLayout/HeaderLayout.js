import styles from "./HeaderLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Main from "../Main/Main";
import "~/styles/grid.css";
const cx = classNames.bind(styles);
function HeaderLayout({ children }) {
  return (
    <div className={cx(".header_layout")}>
      <Header></Header>
      <div className={cx("content")}>
        <Main>{children}</Main>
      </div>
    </div>
  );
}

export default HeaderLayout;
