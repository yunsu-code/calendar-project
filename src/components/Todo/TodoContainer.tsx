import React, { Children, FC, ReactNode } from "react";
import styles from "@style/components/todo/todoContainer.module.scss";

interface TodoContainerProps {
  children: ReactNode;
}

const TodoContainer: FC<TodoContainerProps> = ({ children }) => {
  return <div className={styles.todoContainer}>{children}</div>;
};

export default TodoContainer;
