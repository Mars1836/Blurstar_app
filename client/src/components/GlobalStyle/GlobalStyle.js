import classNames from "classnames/bind";
import styles from "./GlobalStyle.module.scss";
import "normalize.css";
const cx = classNames.bind(styles);
const GlobalStyle = ({ children }) => {
  return <>{children}</>;
};
export default GlobalStyle;
