import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getDate, getMonth, getDay, getYear } from "date-fns";
import styles from "@style/components/calendar.module.scss";

interface CalendarProps {
  selectCalendar: (
    currentDay: number,
    currentMonth: number,
    currentYear: number
  ) => void;
  calChange: any;
  startDate: any;
}

const Calendar: FC<CalendarProps> = ({
  startDate,
  selectCalendar,
  calChange,
}) => {
  const renderDay = (day: any) => {
    return <span className={styles.dayBtn}>{day}</span>;
  };

  const handleonChange = (dates: Date) => {
    calChange(dates);
  };
  return (
    <DatePicker
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
      dateFormat="yyyy.MM.dd"
      inline
      todayButton="Today"
      selected={startDate}
      onChange={(dates: Date) => {
        calChange(dates);
      }}
      renderDayContents={renderDay}
    />
  );
};

export default Calendar;
