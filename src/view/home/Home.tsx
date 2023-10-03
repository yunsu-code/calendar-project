import React, { FC, useState, useEffect } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@style/override/datepicker-custom.scss";
import "@style/override/antd-custom.scss";
import styles from "@style/home/home.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Calendar from "@components/calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { actionCreator as dateActions } from "@redux//date";
import { addTodo } from "@redux/todo";

import TodoList from "@/components/Todo/TodoList";
import BottomDrawer from "@/components/drawer/BottomDrawer";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [castartDate, setcaStartDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(getYear(new Date()));
  const [currentMonth, setCurrentMonth] = useState<number>(
    getMonth(new Date())
  );
  const [currentDay, setCurrentDay] = useState<number>(getDate(new Date()));
  const dispatch = useDispatch();

  useEffect(() => {
    setStartDate(castartDate);
    setCurrentYear(getYear(startDate));
    setCurrentMonth(getMonth(startDate));
    setCurrentDay(getDate(startDate));
    console.log(currentYear);
    console.log(currentMonth);
    console.log(currentDay);
  }, [castartDate]);
  // console.log(castartDate);

  const selectCalendar = (
    currentDay: number,
    currentMonth: number,
    currentYear: number
  ) => dispatch(dateActions.Select(currentDay, currentMonth, currentYear));

  const onCreate = (value: any) => {
    console.log(value);
    selectCalendar(currentDay, currentMonth, currentYear);
    setOpen(false);
  };

  return (
    <div className={styles.calendarWrap}>
      <Calendar
        startDate={castartDate}
        calChange={setcaStartDate}
        selectCalendar={selectCalendar}
      />
      <TodoList listTitle={""} />
      <FloatButton
        icon={<PlusOutlined style={{ color: "#fff" }} />}
        onClick={() => {
          setModalText(`${currentYear}년 ${currentMonth}월 ${currentDay}일`);
          setOpen(true);
        }}
      />
      <BottomDrawer
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
