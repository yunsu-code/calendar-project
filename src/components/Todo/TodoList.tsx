import React, { FC, useState } from "react";
import styles from "@style/components/todo/todoList.module.scss";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import cx from "classnames";
import { EllipsisOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "@redux/todo";
import { selectTodo } from "@redux/date";
import { stateModal } from "@redux/modalUi";

interface TodoListProps {
  listTitle: string;
  listNote: string;
  color: string;
  id: number;
  check: boolean;
  // onIdChange: (id: number) => void;
}

const TodoList: FC<TodoListProps> = ({
  listTitle,
  listNote,
  color,
  id,
  check,
  // onIdChange,
}) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const onChecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    dispatch(toggleTodo(id));
  };

  const clickUpdate = () => {
    dispatch(selectTodo(id));
    dispatch(stateModal(true));
  };

  return (
    <List.Item
      className={cx(
        styles.listWrap,
        checked || check ? styles.done : styles.ing
      )}
      actions={[
        <>
          <Button onClick={clickUpdate} icon={<EllipsisOutlined />}></Button>
        </>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox
            onChange={onChecked}
            checked={check}
            style={
              checked || check
                ? { backgroundColor: color, borderColor: color }
                : { borderColor: color }
            }
            className={checked || check ? styles.checked : styles.unChecked}
          ></Checkbox>
        }
        title={listTitle}
        description={listNote}
      />
    </List.Item>
  );
};

export default TodoList;
