import Tippy from "@tippyjs/react/headless"; // different import path!
import React from "react";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Button from "../Button/Button";
const cx = classNames.bind(styles);
const Menu = ({ items, children, ...props }) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <>
      <Tippy
        {...props}
        interactive={true}
        placement="bottom-end"
        offset={[20, 15]}
        trigger="click"
        render={(attrs) => (
          <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
            {items.map((item, index) => {
              return (
                <Button
                  className={cx("item")}
                  key={index}
                  onClick={item.action}
                  {...item.props}
                >
                  {item.icon}
                  {item.title}
                </Button>
              );
            })}
          </div>
        )}
      >
        {children}
      </Tippy>
    </>
  );
};
export default Menu;
