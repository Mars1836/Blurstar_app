import styles from "./Main.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Main({ children }) {
  return <div className={cx("Main")}>{children}</div>;
}
export default Main;
