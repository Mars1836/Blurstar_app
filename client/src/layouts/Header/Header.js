import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Search from "./components/Search";
import Action from "./components/Action";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
const cx = classNames.bind(styles);
function Header() {
  return (
    <div className={cx("header")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo")}>
          <Button href="/">
            <Logo large={130}></Logo>
          </Button>
        </div>
        <Search></Search>
        <Action></Action>
      </div>
    </div>
  );
}
export default Header;
