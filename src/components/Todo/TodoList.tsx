import React, { FC, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";

interface TodoListProps {
  listTitle: string;
}

const TodoList: FC<TodoListProps> = ({ listTitle }) => {
  const [arrowOpen, setArrowOpen] = useState(false);
  return (
    <></>
    // <div>
    //   {/* <ColorPicker
    //     open={arrowOpen}
    //     onOpenChange={setArrowOpen}
    //     showText={() => (
    //       <DownOutlined
    //         rotate={arrowOpen ? 180 : 0}
    //         style={{
    //           color: "rgba(0, 0, 0, 0.25)",
    //         }}
    //       />
    //     )}
    //   /> */}
    //   <span>{listTitle}</span>
    // </div>
  );
};

export default TodoList;
