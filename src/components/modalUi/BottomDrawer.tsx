import React, { FC, useState } from "react";
// antd
import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, ColorPicker, theme } from "antd";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "@redux/todo";
import { stateDrawer } from "@redux/modalUi";

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
  const [arrowOpen, setArrowOpen] = useState(false);
  const dispatch = useDispatch();

  const myTodoData = useSelector((state: any) => state.todo);

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
  const cancel = () => {
    form.resetFields();
    dispatch(stateDrawer(false));
  };

  return (
    <Drawer
      open={open}
      onClose={cancel}
      title={`${currentDate} 할 일을 입력하세요.`}
      height={600}
      placement={"bottom"}
      destroyOnClose //닫기시 하위요소 마운트 해제
    >
      <Form form={form} layout="vertical" initialValues={{ color: "#1677ff" }}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input type="text" placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="note"
          label="Note"
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
        >
          <Input.TextArea rows={4} placeholder="Note" />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker
            open={arrowOpen}
            disabledAlpha
            onOpenChange={setArrowOpen}
            // value={"#1677ff"}
            showText={() => (
              <DownOutlined
                rotate={arrowOpen ? 180 : 0}
                style={{
                  color: "rgba(0, 0, 0, 0.25)",
                }}
              />
            )}
          />
        </Form.Item>
        <Space>
          <Button htmlType="submit" type="primary" onClick={submit}>
            저장
          </Button>
          <Button onClick={cancel}>취소</Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default BottomDrawer;
