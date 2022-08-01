import styles from "./ContentBubble.module.scss";
import classNames from "classnames/bind";
import { createContext, useContext, useEffect } from "react";
import { useLock } from "../../layouts/DefaultLayout/DefaultLayout";
const cx = classNames.bind(styles);
const BubbleContext = createContext(null);

function ContentBubble({ children, onClick, onHide }) {
  // const setLock = useLock();
  // useEffect(() => {
  //   setLock(true);
  // }, []);
  const handleClick = (e) => {
    onClick();
    onHide();
    // setLock(false);
    e?.stopPropagation();
  };
  return (
    <BubbleContext.Provider value={{ hide: handleClick }}>
      <div
        className={cx("wrapper")}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {children}
      </div>
    </BubbleContext.Provider>
  );
}
export const useBubbleControl = () => {
  const bubble_control = useContext(BubbleContext);
  return bubble_control;
};
export default ContentBubble;
