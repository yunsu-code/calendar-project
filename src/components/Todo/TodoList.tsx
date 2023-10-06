import React, { FC, useState } from "react";
import styles from "@style/components/todo/todoList.module.scss";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import cx from "classnames";
import { toggleTodo } from "@redux/todo";
import { useSelector, useDispatch } from "react-redux";

interface TodoListProps {
  listTitle: string;
  listNote: string;
  color: any;
}

const TodoList: FC<TodoListProps> = ({ listTitle, listNote, color }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch;
  const onChecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <div className={styles.listWrap}>
      <Checkbox
        onChange={onChecked}
        style={
          checked
            ? { backgroundColor: color, borderColor: color }
            : { borderColor: color }
        }
        className={cx(
          styles.checkbox,
          checked ? styles.checked : styles.unChecked
        )}
      ></Checkbox>
      <div className={styles.listInner}>
        <div>{listTitle}</div>
        <div>{listNote}</div>
      </div>
    </div>
  );
};

export default TodoList;
