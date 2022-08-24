import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./LoadingComment.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function LoadingComment() {
  return (
    <div className={cx("wrapper")}>
      <Box sx={{ display: "flex", color: "var(--light-gray)" }}>
        <CircularProgress color="inherit" />
      </Box>
    </div>
  );
}

export default LoadingComment;
