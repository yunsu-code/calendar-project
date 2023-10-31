import React, { FC } from "react";
// antd
import { Drawer, Form } from "antd";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "@redux/todo";
import { stateDrawer } from "@redux/modalUi";
import TodoForm from "../Todo/TodoForm";
import TodoSaveButton from "../Todo/TodoSaveButton";
import styles from "@style/components/modalUi/BottomDrawer.module.scss";
interface Values {
  title: string;
  note: string;
  color: any;
}

interface BottomDrawerProps {
  open: boolean;
  currentDate: string;
}

const BottomDrawer: FC<BottomDrawerProps> = ({ open, currentDate }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const myTodoData = useSelector((state: any) => state.todo);

  // 저장 클릭시
  const submit = () => {
    form
      .validateFields() //필수 입력 체크
      .then((values: Values) => {
        form.resetFields();
        dispatch(stateDrawer(false));
        dispatch(
          addTodo(
            myTodoData.length === 0
              ? myTodoData.length + 1
              : myTodoData[myTodoData.length - 1].id + 1, // todo삭제 후에도 번호 겹치지 않도록 마지막 인덱스 id + 1
            values,
            currentDate
          )
        );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 취소 클릭시
  const cancel = () => {
    form.resetFields();
    dispatch(stateDrawer(false));
  };

  return (
    <Drawer
      open={open}
      onClose={cancel}
      title={`${currentDate} 할 일을 입력하세요.`}
      height={"auto"}
      placement={"bottom"}
      destroyOnClose //닫기시 하위요소 마운트 해제
    >
      <TodoForm
        className={styles.todoForm}
        forms={form}
        values={{ color: "#1677ff" }}
        saveButton={
          <div className={styles.bottomBtns}>
            <TodoSaveButton submit={submit} cancel={cancel} />
          </div>
        }
      />
    </Drawer>
  );
};

export default BottomDrawer;
