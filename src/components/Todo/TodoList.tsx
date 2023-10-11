import React, { FC, useState } from "react";
import styles from "@style/components/todo/todoList.module.scss";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import cx from "classnames";
import { toggleTodo, deleteTodo, editTodo } from "@redux/todo";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { List } from "antd";
// 커밋테스트

interface TodoListProps {
  listTitle: string;
  listNote: string;
  color: any;
  id: number;
  check: boolean;
  onIdChange: (id: number) => void;
}

const TodoList: FC<TodoListProps> = ({
  listTitle,
  listNote,
  color,
  id,
  check,
  onIdChange,
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

  const editData = () => {
    onIdChange(id);
    // dispatch(editTodo(id));
  };

  return (
    <List.Item
      className={cx(
        styles.listWrap,
        checked || check ? styles.done : styles.ing
      )}
      actions={[
        <>
          <Button icon={<FormOutlined />} onClick={editData} />
          <Button icon={<DeleteOutlined />} onClick={deleteData} />
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
