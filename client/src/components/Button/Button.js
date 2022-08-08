import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Model from "../Model";
const cx = classNames.bind(styles);
const Button = React.forwardRef(
  (
    {
      to,
      href,
      children,
      className,
      dialog,
      onClick,
      componentOnHide,
      text,
      ...props
    },
    ref
  ) => {
    const [showDialog, setShowDialog] = useState(false);
    let Comp = "span";
    if (to) {
      Comp = Link;
    } else if (href) {
      Comp = "a";
    }
    return (
      <Comp
        ref={ref}
        to={to}
        href={href}
        className={cx("wrapper", className)}
        text={text}
        onClick={() => {
          if (typeof onClick === "function") {
            onClick();
          }
          setShowDialog(true);
        }}
        {...props}
      >
        {children}
        {showDialog && dialog && (
          <Model
            setClose={setShowDialog}
            onClose={componentOnHide || function () {}}
          >
            {dialog}
          </Model>
        )}
      </Comp>
    );
  }
);
export default Button;
