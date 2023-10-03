import React, { FC, useState, useMemo } from "react";
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
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const BottomDrawer: FC<BottomDrawerProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [arrowOpen, setArrowOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Drawer
      open={open}
      onClose={() => {
        form.resetFields();
        onCancel();
      }}
      title={" 할 일을 입력하세요."}
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
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields() //필수 입력 체크
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                  dispatch(addTodo(values));
                  console.log("sss");
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            저장
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
          >
            취소
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default BottomDrawer;
