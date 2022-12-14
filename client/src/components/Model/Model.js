import ReactDOM from "react-dom";
import styles from "./Model.module.scss";
import className from "classnames/bind";
import { createContext, useEffect } from "react";
const cx = className.bind(styles);
export const ModelContext = createContext();
const Model = ({ conponent, setClose, onClose, children }) => {
  function disable() {
    // To get the scroll position of current webpage
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    // if scroll happens, set it to the previous value
    window.onscroll = function () {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }
  function enable() {
    window.onscroll = function () {};
  }
  useEffect(() => {
    disable();
    return () => {
      enable();
    };
  }, []);
  function handleClose() {
    onClose();
    setClose(false);
  }
  return ReactDOM.createPortal(
    <ModelContext.Provider value={{ handleClose }}>
      <div
        className={cx("model-wrapper")}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <div className={cx("content")}> {children}</div>
      </div>
    </ModelContext.Provider>,
    document.querySelector("body")
  );
};
export default Model;
