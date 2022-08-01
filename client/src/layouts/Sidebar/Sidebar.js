import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Sidebar({ children }) {
  return (
    <div className={cx("sidebar")}>
      <div className={cx("wrapper")}>{children}</div>
    </div>
  );
}
export default Sidebar;
