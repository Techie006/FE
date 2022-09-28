import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./react-calendar/style.css";

const DatePicker = ({ defaultDate, ...props }) => {
  const [date, setDate] = useState(defaultDate);

  const changeHandler = (selectedDate) => {
    // 동일 날짜 선택시 상태 변화하지 않음
    if (date === selectedDate) {
      return;
    }

    // 선택한 날짜로 변경
    setDate(selectedDate);
  };

  return (
    <div style={{ ...props }}>
      <Calendar
        locale='ko'
        onChange={changeHandler}
        value={date}
        formatDay={(_, date) => {
          return date.getDate();
        }}
        maxDetail='month'
        minDetail='year' // month와 year view만 가능하도록 설정
      />
    </div>
  );
};

export default DatePicker;
