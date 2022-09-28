import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";
import "./react-calendar/style.css";
import { closeDatePicker } from "../../modules/redux/calendar";
import { parseDate } from "../../shared/regex";

const DatePicker = ({ depth, ...props }) => {
  // 식단 모달 생성하기인 경우, 캘린더에서 선택된 날짜나 오늘 날짜를 가져옴
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date(selectedDate));

  // 선택한 날짜로 변경
  const changeHandler = (selectedDay) => {
    setDate(selectedDay);
    const parsedDate = parseDate(selectedDay);
    dispatch(closeDatePicker({ selectedDate: parsedDate }));
  };

  return (
    <StLayout style={{ ...props }} depth={depth}>
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
    </StLayout>
  );
};

export default DatePicker;

const StLayout = styled.div`
  position: fixed;
  left: 50%;
  top: 81%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => props.depth * 80};
`;
