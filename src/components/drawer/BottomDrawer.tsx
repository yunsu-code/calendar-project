import React, { FC, useState, useRef } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, ColorPicker, theme } from "antd";
import { addTodo } from "@redux/todo";
import { useSelector, useDispatch } from "react-redux";
import type { Color, ColorPickerProps } from "antd/es/color-picker";

interface Values {
  title: string;
  note: string;
  color: any;
}

interface BottomDrawerProps {
  open: boolean;
  onCancel: () => void;
  currentDate: string;
}

const BottomDrawer: FC<BottomDrawerProps> = ({
  open,
  currentDate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [arrowOpen, setArrowOpen] = useState(false);
  const dispatch = useDispatch();
  const dataArray = useSelector((state: any) => state.todo);
  const submit = () => {
    form
      .validateFields() //필수 입력 체크
      .then((values: Values) => {
        form.resetFields();
        onCancel();
        dispatch(addTodo(dataArray.length + 1, values, currentDate));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const cancel = () => {
    form.resetFields();
    onCancel();
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
          <Input placeholder="Title" />
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
