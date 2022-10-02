import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./LoadingPage.module.scss";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";
const cx = classNames.bind(styles);
function LoadingPage() {
  useEffect(() => {
    window.onscroll = () => {
      document.body.style.overflow = "hidden";
      window.scroll(0, 0);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={cx("wrapper")}>
      <Box sx={{ display: "flex", color: "var(--ig-secondary-text)" }}>
        <CircularProgress color="inherit" />
      </Box>
    </div>,
    document.querySelector("body")
  );
}

export default LoadingPage;
