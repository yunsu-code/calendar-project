import React, { FC } from "react";
import { Button, Flex } from "antd";
import styles from "@style/components/todo/TodoSaveButton.module.scss";
import cx from "classnames";

interface TodoSaveButtonProps {
  submit: () => void;
  cancel: () => void;
  submitText?: string;
  cancelText?: string;
  submitKeyText?: string; //???
  cancelKeyText?: string; //???
}

const TodoSaveButton: FC<TodoSaveButtonProps> = ({
  submit,
  cancel,
  submitText = "저장",
  cancelText = "취소",
  submitKeyText,
  cancelKeyText,
}) => {
  return (
    <>
      <Flex align="center" justify="center">
        <Button
          className={cx(styles.btn, styles.submitBtn)}
          type="primary"
          onClick={submit}
          key={submitKeyText}
        >
          {submitText}
        </Button>
        <Button
          className={cx(styles.btn, styles.cancelBtn)}
          key={cancelKeyText}
          onClick={cancel}
        >
          {cancelText}
        </Button>
      </Flex>
    </>
  );
};

export default TodoSaveButton;
