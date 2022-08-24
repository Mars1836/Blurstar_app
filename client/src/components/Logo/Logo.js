import classNames from "classnames/bind";
import styles from "./Logo.module.scss";
const cx = classNames.bind(styles);
const Logo = ({ large }) => {
  return (
    <img
      className={cx("logo")}
      src={process.env.PUBLIC_URL + "/logo.png"}
      width={large || 150}
    ></img>
  );
};
export default Logo;
