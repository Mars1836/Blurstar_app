import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import userRequest from "../../../../httprequest/user";
import Avatar from "../../../../components/Avatar";
import TippyHeadless from "@tippyjs/react/headless";
import Button from "../../../../components/Button/Button";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const Search = () => {
  const [placeholder, setPlacehoder] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const navigate = useNavigate();
  const userid = useSelector((state) => state.mainUser.data?._id);
  const input = useRef();
  useEffect(() => {
    if (!searchValue) {
      setUserList([]);
      return;
    }
    const search = setTimeout(() => {
      setLoading(true);
      getUser(searchValue);
    }, 300);
    return () => {
      clearTimeout(search);
    };
  }, [searchValue]);
  function getUser(searchValue) {
    userRequest
      .findExceptId(userid, { name: searchValue })
      .then(({ data }) => {
        return data;
      })
      .then((list) => {
        setUserList(list);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handlePlaceHolder = () => {
    input.current.focus();
  };

  const handleFocusInput = () => {
    setInputFocus(true);
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
        <TippyHeadless
          placement="bottom-start"
          render={(attrs) => (
            <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
              {userList.map((user) => {
                return (
                  <Button
                    className={cx("item")}
                    to={`/profile/${user.username}`}
                    key={user._id}
                    onClick={() => {
                      setInputFocus(false);
                    }}
                  >
                    <Avatar
                      username={user.name}
                      url={user.avatar}
                      size={35}
                      link={false}
                    ></Avatar>

                    <span className={cx("item-text")}>
                      <p className={cx("username")}> {user.username}</p>
                      <p className={cx("name")}>{user.name}</p>
                    </span>
                  </Button>
                );
              })}
            </div>
          )}
          interactive={true}
          visible={userList && inputFocus}
          onClickOutside={() => {
            setInputFocus(false);
          }}
        >
          <input
            className={cx("search-input")}
            ref={input}
            placeholder="Search"
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onChange={handleValueInput}
            value={searchValue}
          ></input>
        </TippyHeadless>
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
          <>
            {!loading ? (
              <span className={cx("clear-icon")} onClick={handleClearInput}>
                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
              </span>
            ) : (
              <span className={cx("loading")}>
                <AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Search;
