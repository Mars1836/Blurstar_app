import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Button from "../../../../components/Button/Button";
const cx = classNames.bind(styles);
const Search = () => {
  const [placeholder, setPlacehoder] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const input = useRef();
  const handlePlaceHolder = () => {
    input.current.focus();
  };
  const handleFocusInput = () => {
    setPlacehoder(false);
  };
  const handleBlurInput = () => {
    if (!searchValue) {
      setPlacehoder(true);
    }
  };
  const handleValueInput = (e) => {
    setSearchValue(e.target.value);
  };
  const handleClearInput = (e) => {
    setSearchValue("");
    setPlacehoder(true);
  };
  return (
    <>
      <div className={cx("search-form")}>
        <input
          className={cx("search-input")}
          ref={input}
          placeholder="Search"
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onChange={handleValueInput}
          value={searchValue}
        ></input>
        {placeholder && (
          <div
            className={cx("search-placeholder")}
            tabIndex={0}
            onFocus={handlePlaceHolder}
          >
            <svg
              className={cx("search-icon")}
              color="#8e8e8e"
              fill="#8e8e8e"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <path
                d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
            <p>Search</p>
          </div>
        )}
        {searchValue && (
          <span className={cx("clear-icon")} onClick={handleClearInput}>
            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
          </span>
        )}
      </div>
    </>
  );
};
export default Search;
