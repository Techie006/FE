import React, { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import SmallButton from "../../elements/buttons/SmallButton";
import Toolbar from "./Toolbar";

const RecipeCalendar = () => {
  const VIEWS = ["Month", "Day"];
  const [view, setView] = useState(VIEWS[0]);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const myEventList = [
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
    {
      id: 19,
      day: "2022-08-31",
      recipe_name: "special event",
      time: "아침",
      liked: true,
      category: "반찬",
      calorie: 278,
      method: "볶음",
    },
  ];

  const scheduleList = myEventList.map((event, idx) => {
    const startTimeFormat = event.day.replace(/-/g, "/");
    // const endTimeFormat = startTimeFormat;
    return {
      title: event.title,
      allDay: false,
      start: new Date(startTimeFormat),
      // end: new Date(endTimeFormat),
      category: event.category,
    };
  });

  const clickHandler = () => {
    if (view === VIEWS[0]) {
      setView(VIEWS[1]);
      return;
    }
    setView(VIEWS[0]);
  };

  return (
    <>
      <div>
        <SmallButton type='button' content={view} onClick={clickHandler} />
        <Calendar
          defaultDate={defaultDate}
          events={scheduleList}
          style={{ height: "500px", width: "90%", margin: "auto" }}
          localizer={localizer}
          components={{
            toolbar: Toolbar,
          }}
          defaultView='month'
        />
      </div>
    </>
  );
};

export default RecipeCalendar;
