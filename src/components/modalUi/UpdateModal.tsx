import React, { FC, useEffect, useState } from "react";

import { Button, Modal, Typography, Flex, Badge, Form } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
const { Title } = Typography;

import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "@/redux/todo";
import { stateModal } from "@redux/modalUi";

import styles from "@style/components/modalUi/UpdateModal.module.scss";
import TodoForm from "../Todo/TodoForm";
import TodoSaveButton from "../Todo/TodoSaveButton";

interface UpdateModalProps {}

interface Values {
  title: string;
  note: string;
  color: any;
}

const UpdateModal: FC<UpdateModalProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoNote, setTodoNote] = useState("");
  const [todoColor, setTodoColor] = useState("");
  const selectData = useSelector((state: any) => state.selectedData);
  const ModalOpen = useSelector((state: any) => state.modalUi.modalOpen);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 수정버튼 클릭시
  const editTodo = () => {
    setIsEdit(true);
    form.resetFields();
  };

  // 삭제여부 확인 팝업
  const showDeleteConfirm = () => {
    confirm({
      title: "정말로 삭제하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      okText: "네",
      okType: "danger",
      cancelText: "아니오",
      centered: true,
      onOk() {
        dispatch(deleteTodo(selectData.currentTodoId));
        dispatch(stateModal(false));
      },
    });
  };

  // 저장 버튼 클릭시
  const submit = () => {
    form
      .validateFields() //필수 입력 체크
      .then((values: Values) => {
        form.resetFields();
        dispatch(stateModal(false));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 삭제 버튼 클릭시
  const cancel = () => {
    dispatch(stateModal(false));
    form.resetFields();
    setIsEdit(false);
  };

  // todo 값 useState에 세팅
  useEffect(() => {
    setTodoTitle(selectData.thisTodo.title);
    setTodoNote(selectData.thisTodo.note);
    setTodoColor(
      Object.keys(selectData.thisTodo).includes("color")
        ? Object.keys(selectData.thisTodo.color).includes("metaColor")
          ? `rgb(${selectData.thisTodo.color.metaColor.r}, ${selectData.thisTodo.color.metaColor.g}, ${selectData.thisTodo.color.metaColor.b})`
          : selectData.thisTodo.color
        : ""
    );
  });

  // 수정 팝업 form에 선택한 todo 값 세팅
  useEffect(() => {
    form.setFieldsValue({
      title: todoTitle,
      note: todoNote,
      color: todoColor,
    });
  }, [isEdit]);

  return (
    <Modal
      title={<Title level={5}>{selectData.currentDate}</Title>}
      open={ModalOpen}
      centered
      onCancel={cancel}
      footer={[
        !isEdit ? (
          <TodoSaveButton
            submitText="수정"
            cancelText="삭제"
            submit={editTodo}
            cancel={showDeleteConfirm}
            submitKeyText="submit"
            cancelKeyText="back"
          />
        ) : (
          <TodoSaveButton
            submit={submit}
            cancel={cancel}
            submitKeyText="submit1"
            cancelKeyText="back1"
          />
        ),
      ]}
    >
      {isEdit === false && (
        <>
          <Flex align="center" justify="flex-start">
            <Badge color={todoColor} />
            <Title level={5} style={{ margin: 0 }}>
              {todoTitle}
            </Title>
          </Flex>
          <p className={styles.noteText}>{todoNote}</p>
        </>
      )}
      {isEdit === true && <TodoForm forms={form} />}
    </Modal>
  );
};

export default UpdateModal;
