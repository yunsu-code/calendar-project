import React, { FC, useState, useEffect } from "react";
import { getDate, getMonth, getYear, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@style/override/datepicker-custom.scss";
import "@style/override/antd-custom.scss";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "@/components/Todo/TodoList";
import BottomDrawer from "@/components/drawer/BottomDrawer";
import styles from "@style/home/home.module.scss";
import useMediaQuery from "@assets/js/useMediaQuery";
import cx from "classnames";
import TodoContainer from "@/components/Todo/TodoContainer";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<any>("");
  const [currentTodo, setCurrentTodo] = useState<any>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const Tablet = useMediaQuery(900);
  const dataArray = useSelector((state: any) => state.todo);

  const renderDay = (day: any, date: any) => {
    const dateFormat = format(date, "yyyy년 MM월 dd일");
    const dateFilter = dataArray.filter(
      (date: any) => date.date === dateFormat
    );
    return (
      <>
        <span className={styles.dayBtn}>{day}</span>
        {dateFilter.length > 0 ? (
          <div className={styles.colorDotWrap}>
            {dateFilter.slice(0, 4).map((data: any) => (
              <div
                key={data.id}
                className={styles.colorDot}
                style={
                  data.content.color.length > 0
                    ? {
                        backgroundColor: data.content.color,
                      }
                    : {
                        backgroundColor: `rgb(${data.content.color.metaColor.r}, ${data.content.color.metaColor.g}, ${data.content.color.metaColor.b})`,
                      }
                }
              ></div>
            ))}
            {dateFilter.length > 4 ? <span>..</span> : ""}
          </div>
        ) : null}
      </>
    );
  };

  useEffect(() => {
    setCurrentDate(format(startDate, "yyyy년 MM월 dd일"));
  }, [startDate]);

  useEffect(() => {
    setCurrentTodo(dataArray.filter((date: any) => date.date === currentDate));
  }, [currentDate, dataArray]);

  return (
    <div
      className={cx(styles.calendarWrap, Tablet ? styles.tablet : styles.pc)}
    >
      <DatePicker
        className={styles.calendar}
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
        dateFormat="yyyy.MM.dd"
        inline
        todayButton="Today"
        selected={startDate}
        onChange={(dates: Date) => {
          setStartDate(dates);
        }}
        renderDayContents={renderDay}
      />
      <BottomDrawer
        open={open}
        currentDate={currentDate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TodoContainer>
        <h2>{currentDate}</h2>
        {currentTodo.length > 0 ? (
          currentTodo.map((data: any) => (
            <TodoList
              key={data.id}
              listTitle={data.content.title}
              listNote={data.content.title}
              color={
                data.content.color.length > 0
                  ? data.content.color
                  : `rgb(${data.content.color.metaColor.r}, ${data.content.color.metaColor.g}, ${data.content.color.metaColor.b})`
              }
            />
          ))
        ) : (
          <div className={styles.noData}>등록된 일정이 없습니다.</div>
        )}
      </TodoContainer>
      <FloatButton
        icon={<PlusOutlined style={{ color: "#fff" }} />}
        onClick={() => {
          setOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
