import React, { FC, useState, useEffect, useRef } from "react";
// datepicker
import DatePicker from "react-datepicker";
import { getDate, getMonth, getYear, format, getWeekOfMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
// component
import TodoList from "@/components/Todo/TodoList";
import BottomDrawer from "@/components/modalUi/BottomDrawer";
import TodoContainer from "@/components/Todo/TodoContainer";
// antd
import { FloatButton, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "@style/override/datepicker-custom.scss";
import "@style/override/antd-custom.scss";
// style
import styles from "@style/home/home.module.scss";
import cx from "classnames";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectDate } from "@/redux/SelectedData";
import { stateDrawer } from "@redux/modalUi";
import UpdateModal from "@/components/modalUi/UpdateModal";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const today = new Date();
  const dispatch = useDispatch();
  const calendar = useRef(null);
  const listCont = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Date>(today);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(getYear(today));
  const [currentMonth, setCurrentMonth] = useState<number>(getMonth(today) + 1);
  const [currentDay, setCurrentDay] = useState<number>(getDate(today));
  const [currentWeek, setCurrentWeek] = useState<number>(getWeekOfMonth(today));
  const [currentTodo, setCurrentTodo] = useState<any>([]);
  const [toTopContent, setToTopContent] = useState<Boolean>(false);

  const todayFormat = format(today, "yyyy.MM.dd");
  const myTodoData = useSelector((state: any) => state.todo);
  const drawerOpen = useSelector((state: any) => state.modalUi.drawerOpen);

  // 날짜 생성 (todo 유무 뱃지와 함께)
  const renderDay = (day: number, date: Date) => {
    const currentDateFormat = format(date, "yyyy.MM.dd");
    const dateFilter = myTodoData.filter(
      (date: any) => date.date === currentDateFormat
    );
    return (
      <>
        <span className={styles.dayBtn}>{day}</span>
        {dateFilter.length > 0 ? (
          <div className={styles.colorDotWrap}>
            {dateFilter.slice(0, 3).map((data: any) => (
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
            {dateFilter.length > 3 ? (
              <span>+{dateFilter.length - 3}</span>
            ) : null}
          </div>
        ) : null}
      </>
    );
  };

  // 선택한 투두리스트 state에 저장
  useEffect(() => {
    setCurrentTodo(myTodoData.filter((date: any) => date.date === currentDate));
  }, [currentDate, myTodoData]);

  // 선택한 날짜 정보 state에 저장
  useEffect(() => {
    setCurrentDate(format(startDate, "yyyy.MM.dd"));
    setCurrentYear(getYear(startDate));
    setCurrentMonth(getMonth(startDate) + 1);
    setCurrentDay(getDate(startDate));
    setCurrentWeek(getWeekOfMonth(startDate));
  }, [startDate]);

  // 선택한 날짜 정보 dispatch
  useEffect(() => {
    dispatch(
      selectDate(
        currentDate,
        currentYear,
        currentMonth,
        currentWeek,
        currentDay
      )
    );
  });

  // 주간보기 버튼 클릭 이벤트
  const toTop = () => {
    console.log("test");
    const calendarDiv = calendar.current.calendar.componentNode;
    const weekEl = calendar.current.calendar.componentNode.querySelectorAll(
      ".react-datepicker__week"
    );
    const monthEl = calendar.current.calendar.componentNode.querySelector(
      ".react-datepicker__month"
    );
    const selectedWeek = weekEl[currentWeek - 1];
    const todoListCont = listCont.current;
    if (!toTopContent) {
      setToTopContent(true);
      monthEl.style.transform = `translateY(-${selectedWeek.offsetTop + 10}px)`;
      calendarDiv.style.setProperty("position", "fixed");
      todoListCont?.classList.add(`${styles.fixed}`);
    } else {
      setToTopContent(false);
      monthEl.style.transform = `unset`;
      calendarDiv.style.setProperty("position", "unset");
      todoListCont?.classList.remove(`${styles.fixed}`);
    }
  };

  return (
    <div className={cx(styles.calendarWrap, styles.tablet)}>
      <div className={styles.datePicker}>
        <DatePicker
          ref={calendar}
          className={styles.calendar}
          disabledKeyboardNavigation
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
      </div>
      <BottomDrawer open={drawerOpen} currentDate={currentDate} />
      <TodoContainer ref={listCont} setTop={toTopContent} toTopFunc={toTop}>
        <h2>{currentDate === todayFormat ? "Today" : currentDate}</h2>
        {currentTodo.length > 0 ? (
          <List itemLayout="horizontal">
            {currentTodo.map((data: any) => (
              <TodoList
                key={data.id}
                id={data.id}
                check={data.done}
                listTitle={data.content.title}
                listNote={data.content.note}
                color={
                  data.content.color.length > 0
                    ? data.content.color
                    : `rgb(${data.content.color.metaColor.r}, ${data.content.color.metaColor.g}, ${data.content.color.metaColor.b})`
                }
              />
            ))}
          </List>
        ) : (
          <div className={styles.noData}>등록된 일정이 없습니다.</div>
        )}
      </TodoContainer>
      <FloatButton
        icon={<PlusOutlined style={{ color: "#fff" }} />}
        onClick={() => {
          dispatch(stateDrawer(true));
        }}
      />
      <UpdateModal />
    </div>
  );
};

export default Home;
