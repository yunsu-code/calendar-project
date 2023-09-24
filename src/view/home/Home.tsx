import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
// import { ko } from "date-fns/esm/locale";
import { getDate } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@style/override/datepicker-custom.scss";
import "@style/override/antd-custom.scss";
import styles from "@style/home/home.module.scss";
import useMediaQuery from "@assets/js/useMediaQuery";
import cx from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Input } from "antd";
import type { SearchProps } from "../Search";
const { Search } = Input;
interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const isTablet = useMediaQuery(900);
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const renderDay = (day: any, date: any) => {
    return <span className={styles.dayBtn}>{getDate(date)}</span>;
  };
  console.log(startDate);

  const showModal = () => {
    setModalText(startDate.toLocaleDateString());
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onSearch: SearchProps["onSearch"] = (value: any, _e: any, info: any) =>
    console.log(value);

  return (
    <div
      className={cx(styles.calendarWrap, isTablet ? styles.tablet : styles.pc)}
    >
      <DatePicker
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        dateFormat="yyyy.MM.dd"
        inline
        todayButton="Today"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        renderDayContents={renderDay}
      />
      <FloatButton
        icon={<PlusOutlined style={{ color: "#fff" }} />}
        onClick={showModal}
      />
      <Modal
        title={modalText}
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Search placeholder="할 일을 입력하세요." onSearch={onSearch} />
      </Modal>
    </div>
  );
};

export default Home;
