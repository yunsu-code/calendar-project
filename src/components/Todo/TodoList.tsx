import React, { FC, useState, useEffect } from "react";
import styles from "@style/components/todo/TodoList.module.scss";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import cx from "classnames";
import { EllipsisOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "@redux/todo";
import { selectTodo } from "@redux/date";
import { stateModal } from "@redux/modalUi";

interface TodoListProps {
  listTitle: string;
  listNote: string;
  color: string;
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
  const [currentTodo, setCurrentTodo] = useState<any>([]);
  const myTodoData = useSelector((state: any) => state.todo);

  const dispatch = useDispatch();

  // todo 완료 여부 체크
  const onChecked = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    dispatch(toggleTodo(id));
  };

  // todo 상세보기 및 수정, 삭제 팝업
  const clickUpdate = () => {
    setCurrentTodo(myTodoData.filter((date: any) => date.id === id));
    dispatch(stateModal(true));
  };

  // 선택한 todo 정보 redux에 저장
  useEffect(() => {
    currentTodo.length > 0
      ? dispatch(selectTodo(currentTodo[0].id, currentTodo[0].content))
      : null;
  }, [currentTodo]);

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
