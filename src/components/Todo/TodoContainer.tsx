import React, { FC, ReactNode, forwardRef, ForwardedRef, useRef } from "react";
import styles from "@style/components/todo/TodoContainer.module.scss";
import { CaretUpOutlined } from "@ant-design/icons";
import cx from "classnames";

interface TodoContainerProps {
  children: ReactNode;
  toTopFunc: () => void;
  setTop: Boolean;
}

const TodoContainer = forwardRef<HTMLDivElement, TodoContainerProps>(
  ({ children, toTopFunc, setTop }, ref) => {
    return (
      <div className={styles.todoContainer} ref={ref}>
        <div className={styles.toTopBar} onClick={toTopFunc}>
          <CaretUpOutlined
            className={cx(setTop ? styles.down : styles.up)}
            style={{ fontSize: "25px", color: "#c0c0c0" }}
          />
        </div>
        {children}
      </div>
    );
  }
);

export default TodoContainer;
