import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
// import { ko } from "date-fns/esm/locale";
import { getDate } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@style/override/datepicker-custom.scss";
import styles from "@style/home/home.module.scss";
import useMediaQuery from "@assets/js/useMediaQuery";
import cx from "classnames";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const isTablet = useMediaQuery(900);
  const [startDate, setStartDate] = useState(new Date());

  const renderDay = (day: any, date: any) => {
    return <span className={styles.dayBtn}>{getDate(date)}</span>;
  };

  return (
    <div
      className={cx(styles.calendarWrap, isTablet ? styles.tablet : styles.pc)}
    >
      <DatePicker
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        dateFormat="yyyy.MM.dd"
        inline
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        renderDayContents={renderDay}
      />
    </div>
  );
};

export default Home;
