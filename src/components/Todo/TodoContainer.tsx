import React, { FC, ReactNode, forwardRef, ForwardedRef, useRef } from "react";
import styles from "@style/components/todo/TodoContainer.module.scss";
import { CaretUpOutlined } from "@ant-design/icons";
import cx from "classnames";

interface TodoContainerProps {
  children: ReactNode;
  toTopFunc: () => void; //주간 보기 버튼 클릭시
  setTop: Boolean; //주간보기 클릭여부(화살표 방향)
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
