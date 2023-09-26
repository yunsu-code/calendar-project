import React, { FC, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Space, ColorPicker } from "antd";
// import styles from ""

interface BottomDrawerProps {
  dateTitle: string;
  drawerOpen: any;
  drawerClose: any;
}

const BottomDrawer: FC<BottomDrawerProps> = ({
  dateTitle,
  drawerOpen,
  drawerClose,
}) => {
  const [arrowOpen, setArrowOpen] = useState(false);

  return (
    <Drawer
      title={dateTitle + " 할 일을 입력하세요."}
      onClose={drawerClose}
      open={drawerOpen}
      height={600}
      placement={"bottom"}
      destroyOnClose //닫기시 하위요소 마운트 해제
      extra={
        <Space>
          <Button onClick={drawerClose}>취소</Button>
          <Button onClick={drawerClose} type="primary">
            저장
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: "Title" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="Note"
          label="Note"
          rules={[{ required: true, message: "Note" }]}
        >
          <Input.TextArea rows={4} placeholder="Note" />
        </Form.Item>
        <Form.Item
          name="Color"
          label="Color"
          rules={[{ required: true, message: "color is required!" }]}
        >
          <ColorPicker
            open={arrowOpen}
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
      </Form>
    </Drawer>
  );
};

export default BottomDrawer;
