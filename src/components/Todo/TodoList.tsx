import React, { FC, useState } from "react";
import styles from "@style/components/todo/todoList.module.scss";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import cx from "classnames";
import { toggleTodo, deleteTodo } from "@redux/todo";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";

interface TodoListProps {
  listTitle: string;
  listNote: string;
  color: any;
  id: number;
  check: boolean;
}

const TodoList: FC<TodoListProps> = ({
  listTitle,
  listNote,
  color,
  id,
  check,
}) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const dataArray = useSelector((state: any) => state.todo);

  const onChecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    dispatch(toggleTodo(id));
  };

  const deleteData = () => {
    dispatch(deleteTodo(id));
    console.log(id);
  };

  return (
    <List.Item
      className={cx(
        styles.listWrap,
        checked || check ? styles.done : styles.ing
      )}
      actions={[<Button icon={<DeleteOutlined />} onClick={deleteData} />]}
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
