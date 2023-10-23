import React, { FC, ReactNode, useState } from "react";
import { Form, Input, Space, ColorPicker } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface TodoFormProps {
  forms: any;
  values?: object;
  saveButton?: ReactNode;
}

const TodoForm: FC<TodoFormProps> = ({ forms, values, saveButton }) => {
  const [arrowOpen, setArrowOpen] = useState(false);
  return (
    <Form form={forms} layout="vertical" initialValues={values}>
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
      <>{saveButton}</>
    </Form>
  );
};

export default TodoForm;
