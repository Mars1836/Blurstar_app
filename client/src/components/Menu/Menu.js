import Tippy from "@tippyjs/react/headless"; // different import path!
import React from "react";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Button from "../Button/Button";
const cx = classNames.bind(styles);
const Menu = ({ component, items, children, style, ...props }) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <>
      <Tippy
        interactive={true}
        placement="bottom-end"
        onClickOutside={hide}
        offset={[20, 15]}
        visible={visible}
        {...props}
        render={(attrs) => (
          <div className={cx("wrapper")} tabIndex="-1" style={style} {...attrs}>
            {component && component}
            {items &&
              items.map((item, index) => {
                return (
                  <Button
                    className={cx("item")}
                    key={index}
                    onClick={() => {
                      typeof item.action === "function" && item.action();
                      hide();
                    }}
                    {...item.props}
                  >
                    <div className={cx("icon")}> {item.icon}</div>
                    {item.title}
                  </Button>
                );
              })}
          </div>
        )}
      >
        <span
          onClick={visible ? hide : show}
          style={{
            lineHeight: "0px",
          }}
        >
          {children}
        </span>
      </Tippy>
    </>
  );
};
export default Menu;
