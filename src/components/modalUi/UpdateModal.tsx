import React, { FC, useEffect, useState } from "react";

import { Button, Modal, Typography, Flex, Badge } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
const { Title, Paragraph, Text, Link } = Typography;

import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "@/redux/todo";
import { stateModal } from "@redux/modalUi";

import styles from "@style/components/modalUi/UpdateModal.module.scss";

interface UpdateModalProps {}

const UpdateModal: FC<UpdateModalProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const selectData = useSelector((state: any) => state.date);
  const myTodoData = useSelector((state: any) => state.todo);
  const ModalOpen = useSelector((state: any) => state.modalUi.modalOpen);
  const [currentTodo, setCurrentTodo] = useState<any>([]);

  const editTodo = () => {
    setIsEdit(true);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "정말로 삭제하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      okText: "네",
      okType: "danger",
      cancelText: "아니오",
      centered: true,
      onOk() {
        dispatch(stateModal(false));
        dispatch(deleteTodo(selectData.currentTodoId));
      },
    });
  };

  useEffect(() => {
    setCurrentTodo(
      myTodoData.filter((date: any) => date.id === selectData.currentTodoId)
    );
  }, [selectData.currentTodoId]);

  console.log(currentTodo);

  return (
    <Modal
      title={<Title level={4}>{selectData.currentDate}</Title>}
      open={ModalOpen}
      centered
      onCancel={() => dispatch(stateModal(false))}
      footer={
        !isEdit
          ? [
              <Button key="submit" type="primary" onClick={editTodo}>
                수정
              </Button>,
              <Button key="back" onClick={showDeleteConfirm}>
                삭제
              </Button>,
            ]
          : [
              <Button key="submit" type="primary">
                확인
              </Button>,
              <Button key="back" onClick={() => dispatch(stateModal(false))}>
                취소
              </Button>,
            ]
      }
    >
      {currentTodo.length > 0 ? (
        <>
          <Flex align="center" justify="flex-start">
            {currentTodo[0].content.color.length > 0 ? (
              <Badge className="" color={currentTodo[0].content.color} />
            ) : (
              <Badge
                color={`rgb(${currentTodo[0].content.color.metaColor.r}, ${currentTodo[0].content.color.metaColor.g}, ${currentTodo[0].content.color.metaColor.b})`}
              />
            )}
            <Title level={5} style={{ margin: 0 }}>
              {currentTodo[0].content.title}
            </Title>
          </Flex>
          <p className={styles.noteText}>{currentTodo[0].content.note}</p>
        </>
      ) : null}
    </Modal>
  );
};

export default UpdateModal;
