import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Search from "./components/Search";
import Action from "./components/Action";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import history from "history/browser";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const cx = classNames.bind(styles);
function Header() {
  const [searchState, setSearchState] = useState(false);
  return (
    <div className={cx("header")}>
      {!searchState ? (
        <div className={cx("wrapper")}>
          <div className={cx("logo")}>
            <Button href="/">
              <Logo large={100}></Logo>
            </Button>
          </div>
          <div className={cx("search l-4 m-4 c-0")}>
            <Search></Search>
          </div>
          <div className={cx("action")}>
            <Action searchUser={setSearchState}></Action>
          </div>
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <button
            className={cx("back_btn")}
            onClick={() => {
              setSearchState(false);
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "24px" }}></ArrowBackIcon>
          </button>
          <div className={cx("search")}>
            <Search></Search>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
